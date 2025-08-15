# 部署说明文档

## 概述

本项目提供了完整的自动构建和部署解决方案，支持一键部署到远程服务器。

## 部署目标

- **服务器**: `yc@8.140.245.26`
- **路径**: `/home/yc/opensource/scgWeb`
- **访问地址**: `http://8.140.245.26/opensource/scgWeb/`

## 部署脚本

### 1. 完整部署脚本 (`deploy.sh`)

功能最全面的部署脚本，包含：
- 依赖检查
- 版本号更新
- 文件备份
- 远程部署
- 权限设置
- 部署验证
- 错误处理

**使用方法：**
```bash
# 直接运行
bash deploy.sh

# 或使用npm脚本
npm run deploy
```

### 2. 快速部署脚本 (`quick-deploy.sh`)

简化版部署脚本，用于日常快速部署：
- 自动更新版本号
- 直接文件传输
- 快速部署

**使用方法：**
```bash
# 直接运行
bash quick-deploy.sh

# 或使用npm脚本
npm run deploy:quick
```

## 前置要求

### 1. 系统依赖
- Node.js >= 14.0.0
- npm >= 6.0.0
- SSH 客户端
- rsync（推荐）或 scp

### 2. SSH配置
确保已配置SSH密钥认证：

```bash
# 生成SSH密钥（如果还没有）
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 复制公钥到远程服务器
ssh-copy-id yc@8.140.245.26

# 测试连接
ssh yc@8.140.245.26 "echo '连接成功'"
```

## 部署流程

### 1. 开发阶段
```bash
# 修改代码后更新版本号
npm run update-version

# 或直接运行脚本
node update-version.js
```

### 2. 部署阶段
```bash
# 完整部署（推荐首次部署）
npm run deploy

# 快速部署（日常使用）
npm run deploy:quick
```

### 3. 验证部署
```bash
# 检查远程文件
ssh yc@8.140.245.26 "ls -la /home/yc/opensource/scgWeb/"

# 查看部署信息
ssh yc@8.140.245.26 "cat /home/yc/opensource/scgWeb/deploy-info.txt"
```

## 配置选项

### 1. 修改部署配置
编辑 `deploy.config` 文件来自定义：
- 服务器信息
- 部署选项
- 文件过滤规则
- 部署后操作

### 2. 环境变量
可以通过环境变量覆盖配置：
```bash
export REMOTE_USER=yc
export REMOTE_HOST=8.140.245.26
export REMOTE_PATH=/home/yc/opensource
npm run deploy
```

## 故障排除

### 1. 连接问题
```bash
# 测试SSH连接
ssh -v yc@8.140.245.26

# 检查SSH配置
cat ~/.ssh/config
```

### 2. 权限问题
```bash
# 检查远程目录权限
ssh yc@8.140.245.26 "ls -la /home/yc/opensource/"

# 修复权限
ssh yc@8.140.245.26 "chmod -R 755 /home/yc/opensource/scgWeb"
```

### 3. 文件传输问题
```bash
# 检查rsync是否可用
which rsync

# 手动测试文件传输
rsync -avz --dry-run ./ yc@8.140.245.26:/home/yc/opensource/scgWeb/
```

## 最佳实践

### 1. 开发流程
1. 在本地修改代码
2. 测试功能正常
3. 运行 `npm run update-version` 更新版本号
4. 运行 `npm run deploy:quick` 快速部署
5. 验证部署结果

### 2. 生产部署
1. 在测试环境验证
2. 运行 `npm run deploy` 完整部署
3. 检查部署日志
4. 验证网站功能
5. 通知相关人员

### 3. 备份策略
- 每次部署前自动备份
- 保留最近5个备份版本
- 重要更新前手动备份

## 监控和维护

### 1. 部署日志
```bash
# 查看部署信息
cat dist/deploy-info.txt

# 查看远程部署记录
ssh yc@8.140.245.26 "cat /home/yc/opensource/scgWeb/last-deploy.txt"
```

### 2. 性能监控
- 页面加载时间
- 服务器响应时间
- 错误日志监控

### 3. 定期维护
- 清理旧备份
- 更新依赖包
- 检查服务器状态

## 联系支持

如遇到部署问题，请检查：
1. 网络连接是否正常
2. SSH密钥是否配置正确
3. 远程服务器是否可访问
4. 文件权限是否正确

---

**注意**: 部署前请确保代码已测试通过，避免将问题代码部署到生产环境。 