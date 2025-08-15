# SCG Web 官网

陕西文化产业投资控股（集团）有限公司官网项目

## 开发环境设置

### 方法1：使用Node.js开发服务器（推荐）

```bash
# 启动开发服务器（自动禁用缓存）
npm run dev
# 或者
node dev-server.js
```

访问：http://localhost:8000

### 方法2：使用Python简单服务器

```bash
# 启动Python服务器
npm run serve
# 或者
python3 -m http.server 8000
```

访问：http://localhost:8000

## 开发说明

### 缓存问题解决

开发过程中修改CSS和JS文件后，浏览器可能会缓存旧版本。解决方案：

1. **使用Node.js开发服务器**（推荐）
   - 自动添加缓存控制头
   - 修改文件后刷新即可看到效果
   - 无需手动清理浏览器缓存

2. **手动清理缓存**
   - Chrome: `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

3. **开发者工具**
   - 打开开发者工具 (F12)
   - 右键刷新按钮，选择"清空缓存并硬性重新加载"

### 文件结构

```
scgWeb/
├── index.html              # 首页
├── about/
│   ├── about-us.html       # 关于我们页面
│   └── contact-us.html     # 联系我们页面
├── css/
│   ├── style.css          # 主样式文件
│   ├── header.css         # 头部样式
│   ├── footer.css         # 底部样式
│   ├── about-us.css       # 关于我们页面样式
│   └── ...
├── js/
│   ├── header.js          # 头部脚本
│   ├── footer.js          # 底部脚本
│   └── ...
├── dev-server.js          # 开发服务器
└── package.json           # 项目配置
```

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 开发建议

1. 使用Node.js开发服务器进行开发，避免缓存问题
2. 修改CSS/JS后直接刷新页面即可看到效果
3. 使用浏览器开发者工具调试样式和脚本
4. 保持代码结构清晰，遵循命名规范 