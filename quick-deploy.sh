#!/bin/bash

# 快速部署脚本 - 简化版
# 用于日常快速部署到远程服务器

set -e

# 配置
REMOTE_USER="yc"
REMOTE_HOST="8.140.245.26"
REMOTE_PATH="/home/yc/opensource/scgWeb"
SSH_KEY="~/.ssh/scg_deploy_key"
SSH_OPTIONS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

echo "🚀 快速部署到远程服务器..."

# 更新版本号
echo "📝 更新版本号..."
node update-version.js

# 直接部署（使用rsync，如果没有则使用scp）
if command -v rsync &> /dev/null; then
    echo "📤 使用 rsync 部署..."
    rsync -avz --delete \
        -e "ssh -i $SSH_KEY $SSH_OPTIONS" \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='dist' \
        --exclude='*.log' \
        ./ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"
else
    echo "📤 使用 scp 部署..."
    scp -i "$SSH_KEY" $SSH_OPTIONS -r \
        *.html \
        news/ \
        about/ \
        css/ \
        js/ \
        assets/ \
        package.json \
        README.md \
        "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"
fi

echo "✅ 部署完成！"
echo "🌐 访问地址: http://8.140.245.26/opensource/scgWeb/" 