# 陕西文投集团官网

## 解决Bootstrap缓存问题

### 问题描述
使用Bootstrap框架时，每次更新样式后需要清理浏览器缓存才能生效。

### 解决方案

#### 方案1：版本号参数（推荐）
在CSS和JS文件链接后添加版本号参数：
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css?v=1.0.1" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js?v=1.0.1"></script>
```

#### 方案2：自动更新版本号
使用提供的脚本自动更新版本号：
```bash
# 安装依赖（如果需要）
npm install

# 更新版本号
npm run update-version

# 或者直接运行脚本
node update-version.js
```

#### 方案3：HTML meta标签
在HTML head中添加禁用缓存的meta标签：
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

#### 方案4：手动更新版本号
每次修改后，手动更新HTML文件中的版本号参数。

### 使用方法

1. **开发时**：每次修改Bootstrap相关代码后，运行 `npm run update-version`
2. **部署时**：运行 `npm run build` 自动更新版本号
3. **手动更新**：修改HTML文件中的 `?v=版本号` 参数

## 自动部署

### 日常部署（推荐）
```bash
# 日常快速部署
npm run deploy:daily

# 或直接运行脚本
bash daily-deploy.sh
```

### 快速部署
```bash
# 快速部署到远程服务器
npm run deploy:quick

# 或直接运行脚本
bash quick-deploy.sh
```

### 完整部署
```bash
# 完整部署（包含备份、验证等）
npm run deploy

# 或直接运行脚本
bash deploy.sh
```

### 全量打包部署
```bash
# 全量打包部署（推荐首次部署）
npm run deploy:full

# 或直接运行脚本
bash full-deploy.sh
```

### 部署目标
- **服务器**: `yc@8.140.245.26`
- **路径**: `/home/yc/opensource/scgWeb`
- **访问地址**: `http://8.140.245.26/opensource/scgWeb/`

详细部署说明请参考 [DEPLOY.md](./DEPLOY.md)

### 注意事项

- 版本号建议使用时间戳格式（如：202501221430）
- 生产环境建议使用固定版本号，避免频繁更新
- 开发环境可以使用时间戳版本号，确保实时更新
- 部署前请确保SSH密钥已配置

### 文件结构
```
scgWeb/                          # 项目根目录
├── .git/                        # Git版本控制
├── DEPLOY.md                    # 部署说明文档
├── README.md                    # 项目说明文档
├── PROJECT_STRUCTURE.md         # 项目结构说明
├── daily-deploy.sh              # 日常部署脚本
├── deploy.config                # 部署配置文件
├── deploy.sh                    # 完整部署脚本
├── full-deploy.sh               # 全量打包部署脚本
├── package.json                 # 项目配置文件
├── quick-deploy.sh              # 快速部署脚本
└── scgWeb/                      # 网站源码目录
    ├── index.html               # 首页
    ├── about/                   # 关于我们页面
    │   └── contact-us.html     # 联系我们页面
    ├── news/                    # 新闻页面
    │   ├── 1.html
    │   └── 2.html
    ├── css/                     # 样式文件
    ├── js/                      # JavaScript文件
    ├── assets/                  # 资源文件
    └── update-version.js        # 版本号更新脚本
```

详细的项目结构说明请参考 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 