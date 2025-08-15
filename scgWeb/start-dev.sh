#!/bin/bash

# SCG Web 开发服务器启动脚本

echo "🚀 启动 SCG Web 开发服务器..."
echo "📝 已禁用缓存，修改文件后刷新即可看到效果"
echo "🌐 访问地址: http://localhost:8000"
echo "🛑 按 Ctrl+C 停止服务器"
echo ""

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    echo "💡 建议使用 nvm 安装: https://github.com/nvm-sh/nvm"
    exit 1
fi

# 检查dev-server.js是否存在
if [ ! -f "dev-server.js" ]; then
    echo "❌ 错误: 未找到 dev-server.js 文件"
    exit 1
fi

# 启动开发服务器
echo "✅ 正在启动开发服务器..."
node dev-server.js 