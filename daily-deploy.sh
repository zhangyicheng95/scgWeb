#!/bin/bash

# 日常部署脚本 - 快速部署scgWeb目录
# 使用方法: bash daily-deploy.sh

set -e

echo "🚀 日常快速部署 scgWeb 项目..."

# 配置
REMOTE="scg-deploy:/home/yc/opensource/scgWeb"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 1. 更新版本号
echo "📝 更新版本号..."
cd scgWeb && node update-version.js && cd ..

# 2. 使用rsync快速同步
echo "📤 同步文件到服务器..."
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='temp_package_*' \
    --exclude='*.tar.gz' \
    scgWeb/ "$REMOTE/"

# 3. 设置远程权限
echo "🔐 设置文件权限..."
ssh scg-deploy "chmod -R 755 /home/yc/opensource/scgWeb"

# 4. 创建部署标记
echo "📋 创建部署标记..."
ssh scg-deploy "echo '日常部署完成: $(date)' > /home/yc/opensource/scgWeb/daily-deploy.txt"

echo "✅ 日常部署完成！"
echo "🌐 访问地址: http://8.140.245.26/opensource/scgWeb/"
echo "📅 部署时间: $(date)" 