# 项目结构说明

## 📁 项目文件组织

### 根目录 (项目根目录)
```
scgWeb/                          # 项目根目录
├── .git/                        # Git版本控制
├── DEPLOY.md                    # 部署说明文档
├── README.md                    # 项目说明文档
├── PROJECT_STRUCTURE.md         # 项目结构说明（本文件）
├── daily-deploy.sh              # 日常部署脚本
├── deploy.config                # 部署配置文件
├── deploy.sh                    # 完整部署脚本
├── full-deploy.sh               # 全量打包部署脚本
├── package.json                 # 项目配置文件
└── quick-deploy.sh              # 快速部署脚本
```

### scgWeb目录 (网站源码目录)
```
scgWeb/                          # 网站源码目录
├── index.html                   # 首页
├── about/                       # 关于我们页面
│   └── contact-us.html         # 联系我们页面
├── news/                        # 新闻页面
│   ├── 1.html                  # 新闻详情页1
│   └── 2.html                  # 新闻详情页2
├── css/                         # 样式文件
│   ├── style.css               # 主样式文件
│   ├── header.css              # 头部样式
│   ├── footer.css              # 页脚样式
│   ├── mobile.css              # 移动端样式
│   ├── mobile-extra.css        # 移动端额外样式
│   ├── news-detail.css         # 新闻详情页样式
│   └── contact-us.css          # 联系我们页面样式
├── js/                          # JavaScript文件
│   ├── header.js               # 头部脚本
│   ├── footer.js               # 页脚脚本
│   ├── main.js                 # 主要脚本
│   └── mobile.js               # 移动端脚本
├── assets/                      # 资源文件
│   ├── home/                   # 首页图片资源
│   ├── icon/                   # 图标文件
│   └── load/                   # 加载动画资源
└── update-version.js            # 版本号更新脚本
```

## 🚀 部署方式

### 1. 日常部署（推荐）
```bash
# 在项目根目录执行
npm run deploy:daily
# 或
bash daily-deploy.sh
```

### 2. 全量打包部署
```bash
# 在项目根目录执行
npm run deploy:full
# 或
bash full-deploy.sh
```

## 💡 设计理念

### 为什么这样组织？

1. **清晰的职责分离**
   - 根目录：部署脚本和项目配置
   - scgWeb目录：网站源码

2. **便于维护**
   - 部署脚本和网站源码分开
   - 避免部署时包含不必要的文件

3. **标准化结构**
   - 符合常见的Web项目组织方式
   - 便于团队协作和新人理解

4. **部署友好**
   - 可以轻松部署整个scgWeb目录
   - 支持增量更新和全量部署

## 🔧 开发工作流

1. **开发阶段**
   - 在 `scgWeb/` 目录中修改网站文件
   - 测试功能正常

2. **部署阶段**
   - 在项目根目录运行部署脚本
   - 脚本会自动处理版本号更新和文件同步

3. **验证阶段**
   - 访问网站确认更新生效
   - 检查部署日志

## 📝 注意事项

- 所有网站源码文件都放在 `scgWeb/` 目录中
- 部署脚本在项目根目录执行
- 相对路径引用在 `scgWeb/` 目录中是正确的
- 每次部署前会自动更新版本号，解决Bootstrap缓存问题 