#!/bin/bash

# 全量打包部署脚本
# 将整个scgWeb目录打包部署到远程服务器

set -e

# 配置信息
REMOTE_USER="yc"
REMOTE_HOST="8.140.245.26"
REMOTE_PATH="/home/yc/opensource"
PROJECT_NAME="scgWeb"
SSH_KEY="~/.ssh/scg_deploy_key"
SSH_OPTIONS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
PACKAGE_NAME="scgWeb_${TIMESTAMP}.tar.gz"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

echo "🚀 陕西文投集团官网全量打包部署脚本"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# 1. 检查scgWeb目录是否存在
log_info "步骤1: 检查项目目录..."
if [ ! -d "scgWeb" ]; then
    log_error "未找到 scgWeb 目录，请确保在正确的项目根目录下运行此脚本"
    exit 1
fi
log_success "找到项目目录: scgWeb/"

# 2. 进入scgWeb目录更新版本号
log_info "步骤2: 更新项目版本号..."
cd scgWeb
if [ -f "update-version.js" ]; then
    node update-version.js
    log_success "版本号更新完成"
else
    log_warning "未找到 update-version.js 文件，跳过版本号更新"
fi
cd ..

# 3. 创建临时打包目录
log_info "步骤3: 创建临时打包目录..."
TEMP_DIR="temp_package_${TIMESTAMP}"
mkdir -p "$TEMP_DIR"

# 4. 复制scgWeb目录内容到临时目录
log_info "步骤4: 复制项目文件到临时目录..."
cp -r scgWeb/* "$TEMP_DIR/" 2>/dev/null || true
cp -r scgWeb/.* "$TEMP_DIR/" 2>/dev/null || true

# 5. 清理不需要的文件
log_info "步骤5: 清理不需要的文件..."
cd "$TEMP_DIR"
rm -rf .git/ 2>/dev/null || true
rm -rf node_modules/ 2>/dev/null || true
rm -rf dist/ 2>/dev/null || true
rm -rf temp_package_*/ 2>/dev/null || true
rm -f *.log 2>/dev/null || true
rm -f .DS_Store 2>/dev/null || true
rm -f Thumbs.db 2>/dev/null || true
cd ..

# 6. 创建部署信息文件
log_info "步骤6: 创建部署信息文件..."
cat > "$TEMP_DIR/deploy-info.txt" << EOF
部署时间: $(date '+%Y-%m-%d %H:%M:%S')
部署版本: v$(date +"%Y%m%d%H%M")
部署用户: $(whoami)
部署主机: $(hostname)
目标服务器: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
项目名称: $PROJECT_NAME
部署类型: 全量打包部署

文件列表:
$(find "$TEMP_DIR" -type f | sort)

目录结构:
$(find "$TEMP_DIR" -type d | sort)
EOF

# 7. 打包项目文件
log_info "步骤7: 打包项目文件..."
tar -czf "$PACKAGE_NAME" -C "$TEMP_DIR" .
log_success "项目打包完成: $PACKAGE_NAME"

# 8. 测试远程连接
log_info "步骤8: 测试远程服务器连接..."
if ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "echo '连接测试成功'" 2>/dev/null; then
    log_success "远程服务器连接正常"
else
    log_error "无法连接到远程服务器"
    exit 1
fi

# 9. 备份远程现有文件
log_info "步骤9: 备份远程现有文件..."
BACKUP_DIR="$REMOTE_PATH/backup_${TIMESTAMP}"
ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $BACKUP_DIR"
if ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "cp -r $REMOTE_PATH/$PROJECT_NAME/* $BACKUP_DIR/ 2>/dev/null || true"; then
    log_success "远程文件备份完成: $BACKUP_DIR"
else
    log_warning "远程文件备份失败，继续部署..."
fi

# 10. 上传打包文件到服务器
log_info "步骤10: 上传打包文件到服务器..."
scp -i "$SSH_KEY" $SSH_OPTIONS "$PACKAGE_NAME" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"
log_success "打包文件上传完成"

# 11. 在服务器上解压和部署
log_info "步骤11: 在服务器上解压和部署..."
ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" << EOF
    cd $REMOTE_PATH
    
    # 删除现有项目目录
    rm -rf $PROJECT_NAME
    
    # 创建新的项目目录
    mkdir -p $PROJECT_NAME
    
    # 解压项目文件
    tar -xzf $PACKAGE_NAME -C $PROJECT_NAME
    
    # 设置文件权限
    chmod -R 755 $PROJECT_NAME
    
    # 删除打包文件
    rm -f $PACKAGE_NAME
    
    # 创建部署完成标记
    echo "部署完成时间: \$(date)" > $PROJECT_NAME/last-deploy.txt
    echo "部署类型: 全量打包部署" >> $PROJECT_NAME/last-deploy.txt
    echo "打包文件: $PACKAGE_NAME" >> $PROJECT_NAME/last-deploy.txt
    
    echo "服务器端部署完成"
EOF

# 12. 验证部署结果
log_info "步骤12: 验证部署结果..."
REMOTE_FILE_COUNT=$(ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "find $REMOTE_PATH/$PROJECT_NAME -type f | wc -l")
LOCAL_FILE_COUNT=$(find "$TEMP_DIR" -type f | wc -l)

log_info "本地文件数量: $LOCAL_FILE_COUNT"
log_info "远程文件数量: $REMOTE_FILE_COUNT"

if [ "$REMOTE_FILE_COUNT" -ge "$LOCAL_FILE_COUNT" ]; then
    log_success "部署验证成功！"
else
    log_warning "部署验证警告：文件数量不匹配"
fi

# 13. 清理临时文件
log_info "步骤13: 清理临时文件..."
rm -rf "$TEMP_DIR"
rm -f "$PACKAGE_NAME"
log_success "临时文件清理完成"

# 14. 显示部署摘要
log_success "🎉 全量打包部署完成！"
echo
echo "部署摘要："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "项目名称: $PROJECT_NAME"
echo "部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "目标服务器: $REMOTE_USER@$REMOTE_HOST"
echo "部署路径: $REMOTE_PATH/$PROJECT_NAME"
echo "版本号: v$(date +"%Y%m%d%H%M")"
echo "部署类型: 全量打包部署"
echo "备份位置: $BACKUP_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "访问地址: http://8.140.245.26/opensource/$PROJECT_NAME/"
echo "SSH连接: ssh scg-deploy"
echo "备份目录: $BACKUP_DIR"
echo

# 15. 显示远程文件列表
log_info "远程部署文件列表："
ssh -i "$SSH_KEY" $SSH_OPTIONS "$REMOTE_USER@$REMOTE_HOST" "find $REMOTE_PATH/$PROJECT_NAME -type f | sort" 