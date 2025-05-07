import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compatibilityDir = path.join(__dirname, 'src', 'data', 'compatibility');

// 获取目录中所有文件
const files = fs.readdirSync(compatibilityDir);

let fixedFilesCount = 0;

files.forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(compatibilityDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 查找模式: "TYPE1": { "TYPE2": [换行] "TYPE1": {
    const regex = /(["'][\w]+["']\s*:\s*\{\s*\n\s*["'][\w]+["']\s*:)\s*\n\s*(["'][\w]+["']\s*:\s*\{)/;
    
    if (regex.test(content)) {
      // 修复: 用单个大括号替换两个嵌套对象的开始
      content = content.replace(regex, '$1 {');
      
      // 移除多余的结尾大括号（每个问题文件有两个多余的右大括号）
      const lastBraceRegex = /\}\s*\n\s*\}\s*\n\s*\}/g;
      content = content.replace(lastBraceRegex, '}\n}');
      
      // 保存修复后的文件
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`已修复: ${file}`);
      fixedFilesCount++;
    }
  }
});

console.log(`\n总共修复了 ${fixedFilesCount} 个文件`); 