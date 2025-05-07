/**
 * 修复MBTI兼容性数据文件中的重复结构问题
 * 
 * 这个脚本会检查所有相同类型对（如ISTJ-ISTJ, INTP-INTP等）的数据文件，
 * 修复文件中可能存在的重复结构问题。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MBTI类型列表
const MBTI_TYPES = [
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP'
];

// 目标文件夹
const targetDir = path.join(__dirname, 'src', 'data', 'compatibility');

// 检查和修复文件
async function checkAndFixFile(mbtiType) {
  const fileName = `${mbtiType}-${mbtiType}.ts`;
  const filePath = path.join(targetDir, fileName);
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.log(`文件不存在: ${fileName}`);
    return false;
  }
  
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否有重复结构
  // 寻找类似 "},\n"ISTJ": {" 的模式
  const duplicatePattern = new RegExp(`\\},\\s*"${mbtiType}"\\s*:\\s*\\{`);
  
  if (duplicatePattern.test(content)) {
    console.log(`发现重复结构: ${fileName}`);
    
    // 修复文件内容 - 保留第一个结构，删除第二个结构
    const fixedContent = `export default {
  "${mbtiType}": {
    "${mbtiType}": ${
      content
        .split(duplicatePattern)[0]
        .replace('export default {', '')
        .replace(`"${mbtiType}": {`, '')
        .trim()
    }
    }
  }
}`;
    
    // 写入修复后的内容
    fs.writeFileSync(filePath, fixedContent);
    console.log(`已修复: ${fileName}`);
    return true;
  }
  
  return false;
}

// 主函数
async function main() {
  console.log('开始检查和修复MBTI兼容性数据文件...');
  
  let fixedCount = 0;
  
  // 检查每个MBTI类型对
  for (const mbtiType of MBTI_TYPES) {
    const isFixed = await checkAndFixFile(mbtiType);
    if (isFixed) {
      fixedCount++;
    }
  }
  
  console.log(`检查完成！共修复了 ${fixedCount} 个文件。`);
}

main().catch(error => {
  console.error('执行脚本时出错:', error);
  process.exit(1);
}); 