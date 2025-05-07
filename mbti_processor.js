/**
 * MBTI数据处理脚本
 * 
 * 此脚本会将mbti_data文件夹中的兼容性数据处理后移动到src/data/compatibility目录
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源文件夹和目标文件夹
const sourceDir = path.join(__dirname, 'mbti_data');
const targetDir = path.join(__dirname, 'src', 'data', 'compatibility');

console.log('源目录：', sourceDir);
console.log('目标目录：', targetDir);

// 确保目标文件夹存在
if (!fs.existsSync(targetDir)) {
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`创建目录成功: ${targetDir}`);
  } catch (err) {
    console.error(`创建目录失败: ${err.message}`);
    process.exit(1);
  }
}

// 检查源文件夹是否存在
if (!fs.existsSync(sourceDir)) {
  console.error(`源目录不存在: ${sourceDir}`);
  process.exit(1);
}

try {
  // 读取源文件夹中的所有文件
  const files = fs.readdirSync(sourceDir);
  console.log(`源目录共有 ${files.length} 个文件`);

  // 筛选.ts文件（不包括_raw.txt文件）
  const tsFiles = files.filter(file => file.endsWith('.ts') && !file.includes('_raw'));
  console.log(`找到 ${tsFiles.length} 个兼容性数据文件待处理`);

  let processedCount = 0;
  let errorCount = 0;

  // 处理每个文件
  tsFiles.forEach(file => {
    try {
      const filePath = path.join(sourceDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 优化内容格式：添加默认导出
      if (!content.includes('export default')) {
        content = `export default ${content}`;
      }
      
      // 保存到目标文件夹
      const targetFile = path.join(targetDir, file);
      fs.writeFileSync(targetFile, content);
      
      processedCount++;
      console.log(`处理文件 (${processedCount}/${tsFiles.length}): ${file}`);
    } catch (err) {
      errorCount++;
      console.error(`处理文件 ${file} 时出错:`, err.message);
    }
  });

  console.log('处理完成！');
  console.log(`成功处理: ${processedCount} 个文件`);
  console.log(`失败处理: ${errorCount} 个文件`);
  console.log(`文件已保存到: ${targetDir}`);
} catch (err) {
  console.error('执行脚本时出错:', err);
  process.exit(1);
} 