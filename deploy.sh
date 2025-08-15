#!/bin/bash

# 陕西文投集团官网自动构建部署脚本
# 部署目标: yc@8.140.245.26:/home/yc/opensource

set -e  # 遇到错误立即退出

# 配置信息
REMOTE_USER="yc"
REMOTE_HOST="8.140.245.26"
REMOTE_PATH="/home/yc/opensource"
PROJECT_NAME="scgWeb"
BUILD_DIR="dist"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
SSH_KEY="~/.ssh/scg_deploy_key"  # SSH私钥文件路径
SSH_OPTIONS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"  # SSH选项

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    # 检查Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js"
        exit 1
    fi
    
    # 检查npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装，请先安装 npm"
        exit 1
    fi
    
    # 检查rsync
    if ! command -v rsync &> /dev/null; then
        log_warning "rsync 未安装，将使用 scp 进行文件传输"
        USE_SCP=true
    else
        USE_SCP=false
    fi
    
    log_success "依赖检查完成"
}

# 更新版本号
update_version() {
    log_info "更新项目版本号..."
    
    if [ -f "update-version.js" ]; then
        node update-version.js
        if [ $? -eq 0 ]; then
            log_success "版本号更新完成"
        else
            log_error "版本号更新失败"
            exit 1
        fi
    else
        log_warning "未找到 update-version.js 文件，跳过版本号更新"
    fi
}

# 创建构建目录
create_build_dir() {
    log_info "创建构建目录..."
    
    # 清理旧的构建目录
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        log_info "已清理旧的构建目录"
    fi
    
    # 创建新的构建目录
    mkdir -p "$BUILD_DIR"
    log_success "构建目录创建完成: $BUILD_DIR"
}

# 复制项目文件
copy_project_files() {
    log_info "复制项目文件到构建目录..."
    
    # 复制HTML文件
    cp -r *.html "$BUILD_DIR/" 2>/dev/null || true
    cp -r news/ "$BUILD_DIR/" 2>/dev/null || true
    cp -r about/ "$BUILD_DIR/" 2>/dev/null || true
    
    # 复制CSS文件
    cp -r css/ "$BUILD_DIR/" 2>/dev/null || true
    
    # 复制JS文件
    cp -r js/ "$BUILD_DIR/" 2>/dev/null || true
    
    # 复制资源文件
    cp -r assets/ "$BUILD_DIR/" 2>/dev/null || true
    
    # 复制配置文件
    cp package.json "$BUILD_DIR/" 2>/dev/null || true
    cp README.md "$BUILD_DIR/" 2>/dev/null || true
    
    log_success "项目文件复制完成"
}

# 创建部署信息文件
create_deploy_info() {
    log_info "创建部署信息文件..."
    
    cat > "$BUILD_DIR/deploy-info.txt" << EOF
部署时间: $(date '+%Y-%m-%d %H:%M:%S')
部署版本: v$(date +"%Y%m%d%H%M")
部署用户: $(whoami)
部署主机: $(hostname)
目标服务器: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
项目名称: $PROJECT_NAME

文件列表:
$(find "$BUILD_DIR" -type f | sort)
EOF
    
    log_success "部署信息文件创建完成"
}

# 测试远程连接
test_remote_connection() {
    log_info "测试远程服务器连接..."
    
    if ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "echo '连接测试成功'" 2>/dev/null; then
        log_success "远程服务器连接正常"
        return 0
    else
        log_error "无法连接到远程服务器 $REMOTE_USER@$REMOTE_HOST"
        log_info "请确保："
        log_info "1. SSH密钥已配置: $SSH_KEY"
        log_info "2. 远程服务器可访问"
        log_info "3. 用户权限正确"
        return 1
    fi
}

# 备份远程文件
backup_remote_files() {
    log_info "备份远程服务器现有文件..."
    
    local backup_dir="$REMOTE_PATH/backup_$TIMESTAMP"
    
    if ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $backup_dir && cp -r $REMOTE_PATH/$PROJECT_NAME/* $backup_dir/ 2>/dev/null || true"; then
        log_success "远程文件备份完成: $backup_dir"
    else
        log_warning "远程文件备份失败，继续部署..."
    fi
}

# 部署到远程服务器
deploy_to_remote() {
    log_info "开始部署到远程服务器..."
    
    # 创建远程目录
    ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_PATH/$PROJECT_NAME"
    
    # 使用rsync或scp传输文件
    if [ "$USE_SCP" = false ]; then
        log_info "使用 rsync 传输文件..."
        rsync -avz --delete "$BUILD_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$PROJECT_NAME/"
    else
        log_info "使用 scp 传输文件..."
        scp -r "$BUILD_DIR"/* "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$PROJECT_NAME/"
    fi
    
    if [ $? -eq 0 ]; then
        log_success "文件传输完成"
    else
        log_error "文件传输失败"
        exit 1
    fi
}

# 设置远程文件权限
set_remote_permissions() {
    log_info "设置远程文件权限..."
    
    ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "chmod -R 755 $REMOTE_PATH/$PROJECT_NAME"
    
    if [ $? -eq 0 ]; then
        log_success "远程文件权限设置完成"
    else
        log_warning "远程文件权限设置失败"
    fi
}

# 验证部署
verify_deployment() {
    log_info "验证部署结果..."
    
    # 检查远程文件数量
    local remote_file_count=$(ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "find $REMOTE_PATH/$PROJECT_NAME -type f | wc -l")
    local local_file_count=$(find "$BUILD_DIR" -type f | wc -l)
    
    if [ "$remote_file_count" -eq "$local_file_count" ]; then
        log_success "部署验证成功！远程文件数量: $remote_file_count"
    else
        log_warning "部署验证警告：本地文件数量 $local_file_count，远程文件数量 $remote_file_count"
    fi
    
    # 显示远程文件列表
    log_info "远程文件列表："
    ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "find $REMOTE_PATH/$PROJECT_NAME -type f | sort"
}

# 清理构建目录
cleanup_build_dir() {
    log_info "清理构建目录..."
    
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        log_success "构建目录清理完成"
    fi
}

# 显示部署摘要
show_deployment_summary() {
    log_success "🎉 部署完成！"
    echo
    echo "部署摘要："
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "项目名称: $PROJECT_NAME"
    echo "部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "目标服务器: $REMOTE_USER@$REMOTE_HOST"
    echo "部署路径: $REMOTE_PATH/$PROJECT_NAME"
    echo "版本号: v$(date +"%Y%m%d%H%M")"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo
    echo "访问地址: http://8.140.245.26/opensource/$PROJECT_NAME/"
    echo "SSH连接: ssh $REMOTE_USER@$REMOTE_HOST"
    echo
}

# 主函数
main() {
    echo "🚀 陕西文投集团官网自动部署脚本"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo
    
    # 检查依赖
    check_dependencies
    
    # 更新版本号
    update_version
    
    # 创建构建目录
    create_build_dir
    
    # 复制项目文件
    copy_project_files
    
    # 创建部署信息
    create_deploy_info
    
    # 测试远程连接
    if ! test_remote_connection; then
        exit 1
    fi
    
    # 备份远程文件
    backup_remote_files
    
    # 部署到远程服务器
    deploy_to_remote
    
    # 设置远程文件权限
    set_remote_permissions
    
    # 验证部署
    verify_deployment
    
    # 清理构建目录
    cleanup_build_dir
    
    # 显示部署摘要
    show_deployment_summary
}

# 错误处理
trap 'log_error "部署过程中发生错误，退出码: $?"; exit 1' ERR

# 运行主函数
main "$@" 