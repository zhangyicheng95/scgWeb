#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 生成新的版本号（基于时间戳）
function generateVersion() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}`;
}

// 更新HTML文件中的版本号
function updateVersionInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const version = generateVersion();
        
        // 更新Bootstrap CSS版本
        content = content.replace(
            /(https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@[^"]+\.min\.css)(\?v=[^"]*)?/g,
            `$1?v=${version}`
        );
        
        // 更新Bootstrap JS版本
        content = content.replace(
            /(https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@[^"]+\.bundle\.min\.js)(\?v=[^"]*)?/g,
            `$1?v=${version}`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 已更新 ${filePath} 版本号为 v${version}`);
        return true;
    } catch (error) {
        console.error(`❌ 更新 ${filePath} 失败:`, error.message);
        return false;
    }
}

// 查找所有HTML文件并更新版本号
function updateAllHTMLFiles() {
    const htmlFiles = [
        'news/1.html',
        'news/2.html',
        'about/contact-us.html',
        'index.html'
    ];
    
    console.log('🚀 开始更新HTML文件版本号...\n');
    
    let successCount = 0;
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            if (updateVersionInFile(file)) {
                successCount++;
            }
        } else {
            console.log(`⚠️  文件不存在: ${file}`);
        }
    });
    
    console.log(`\n🎉 完成！成功更新 ${successCount}/${htmlFiles.length} 个文件`);
    console.log(`📝 新版本号: v${generateVersion()}`);
}

// 运行脚本
if (require.main === module) {
    updateAllHTMLFiles();
}

module.exports = { generateVersion, updateVersionInFile }; 