/**
 * 修复MBTI兼容性数据文件中的结构问题
 * 
 * 这个脚本会检查所有兼容性数据文件，并修复文件中可能存在的格式和结构问题。
 * 适用于相同类型对(如ISTJ-ISTJ)和不同类型对(如ENTP-ENFP)的文件。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 目标文件夹
const targetDir = path.join(__dirname, 'src', 'data', 'compatibility');

// 读取目录中的所有文件
function getAllCompatibilityFiles() {
  try {
    const files = fs.readdirSync(targetDir);
    return files.filter(file => file.endsWith('.ts') && file !== 'index.ts');
  } catch (error) {
    console.error('读取目录失败:', error);
    return [];
  }
}

// 分析文件名中的MBTI类型
function getTypesFromFilename(filename) {
  // 从文件名中提取类型，例如从"ISTJ-ENFP.ts"提取"ISTJ"和"ENFP"
  const match = filename.match(/([A-Z]{4})-([A-Z]{4})\.ts/);
  if (match) {
    return {
      type1: match[1],
      type2: match[2]
    };
  }
  return null;
}

// 检查和修复文件内容
function fixFileContent(content, types) {
  const { type1, type2 } = types;
  
  // 检查是否存在正确的数据结构
  const expectedStructure = `export default {
  "${type1}": {
    "${type2}": {`;
  
  if (content.includes(expectedStructure)) {
    // 检查文件结构是否正确，是否有多余的部分
    const matches = content.match(/export default \{[\s\S]*?\}/g);
    
    if (matches && matches.length > 1) {
      console.log('  - 发现重复的导出结构，进行修复');
      
      // 提取第一个对象中的主要数据
      let fixedContent = '';
      try {
        // 尝试提取第一个兼容性数据对象
        const startMarker = `export default {
  "${type1}": {
    "${type2}": {`;
        const endMarker = '    }';
        
        const startIndex = content.indexOf(startMarker);
        if (startIndex === -1) {
          throw new Error('找不到开始标记');
        }
        
        let nestLevel = 0;
        let endIndex = -1;
        
        // 从开始标记后开始查找
        for (let i = startIndex + startMarker.length; i < content.length; i++) {
          if (content.substring(i, i + 1) === '{') {
            nestLevel++;
          } else if (content.substring(i, i + 1) === '}') {
            if (nestLevel === 0) {
              // 找到最外层的结束括号
              endIndex = i + 1;
              break;
            }
            nestLevel--;
          }
        }
        
        if (endIndex === -1) {
          throw new Error('找不到结束位置');
        }
        
        // 提取正确的内容并重构
        const validContentPart = content.substring(startIndex, endIndex);
        fixedContent = validContentPart + '\n  }\n}';
        
      } catch (error) {
        console.error(`  - 尝试提取数据时出错: ${error.message}`);
        
        // 使用更简单的方法提取
        fixedContent = `export default {
  "${type1}": {
    "${type2}": ${
          content
            .split(`"${type1}": {`)[1]
            .split(`"${type2}": {`)[1]
            .split(/\},\s*"[A-Z]{4}"\s*:\s*\{/)[0]
        }
    }
  }
}`;
      }
      
      return fixedContent;
    }
  } else {
    // 结构完全不符合预期，尝试重构
    console.log('  - 文件结构不符合预期，尝试重构');
    
    // 使用更简单的方法重构
    try {
      let fixedContent = `export default {
  "${type1}": {
    "${type2}": ${
        content
          .replace(/export default \{[\s\S]*?"[A-Z]{4}"\s*:\s*\{[\s\S]*?"[A-Z]{4}"\s*:\s*\{/g, '')
          .split(/\},\s*"[A-Z]{4}"\s*:\s*\{/)[0]
      }
    }
  }
}`;
      return fixedContent;
    } catch (error) {
      console.error(`  - 重构文件时出错: ${error.message}`);
      return null;
    }
  }
  
  // 如果没有发现问题，返回原始内容
  return content;
}

// 检查和修复文件
async function checkAndFixFile(filename) {
  const filePath = path.join(targetDir, filename);
  
  // 从文件名获取类型
  const types = getTypesFromFilename(filename);
  if (!types) {
    console.log(`跳过非兼容性文件: ${filename}`);
    return false;
  }
  
  console.log(`处理文件: ${filename}`);
  
  // 读取文件内容
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查文件是否包含错误结构的典型标志: 逗号后跟MBTI类型
    const errorPattern = /\},\s*"[A-Z]{4}"\s*:\s*\{/;
    
    if (errorPattern.test(content)) {
      console.log(`  - 发现可能的格式问题`);
      
      // 修复内容
      const fixedContent = fixFileContent(content, types);
      
      if (fixedContent && fixedContent !== content) {
        // 写入修复后的内容
        fs.writeFileSync(filePath, fixedContent);
        console.log(`  - 已修复: ${filename}`);
        return true;
      }
    }
  } catch (error) {
    console.error(`  - 处理文件时出错: ${error.message}`);
  }
  
  return false;
}

// 主函数
async function main() {
  console.log('开始检查和修复MBTI兼容性数据文件...');
  
  const files = getAllCompatibilityFiles();
  console.log(`找到 ${files.length} 个兼容性数据文件`);
  
  let fixedCount = 0;
  
  // 处理每个文件
  for (const file of files) {
    const isFixed = await checkAndFixFile(file);
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