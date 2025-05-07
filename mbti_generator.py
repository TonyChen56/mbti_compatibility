#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
MBTI兼容性数据生成工具

此脚本使用DeepSeek API批量生成MBTI类型兼容性数据，
可直接在前端项目中运行，生成的数据将保存到src/data目录。
"""

import os
import json
import time
from openai import OpenAI
from typing import List, Dict, Any, Optional
import argparse

# MBTI类型列表
MBTI_TYPES = [
    'ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
    'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP'
]

# 已完成的组合（会跳过这些）
COMPLETED_PAIRS = [
    'INFP-INFJ', 'INFP-ENTJ', 'ISTP-ESFP', 'ESFP-ISTP', 'ENFJ-ENFJ',
    'INFJ-INFP', 'ENTJ-INFP'  # 确保双向组合都加入
]

# DeepSeek API提示词模板
PROMPT_TEMPLATE = """
请帮我生成MBTI类型 {type1} 和 {type2} 之间的详细兼容性数据，遵循以下TypeScript格式和规则：

1. 数据应该包含两个方向：{type1} → {type2} 和 {type2} → {type1}
2. 保持与示例相同的数据结构和字段
3. 所有内容必须有中英文双语版本
4. 认知功能兼容性分析应基于MBTI认知函数理论
5. 兼容性评分应该在60-98之间，基于认知功能匹配度
6. 生成的数据应符合专业MBTI理论，描述符合两种类型的特点

以下是模板结构:

```typescript
"{type1}": {{
  "{type2}": {{
    overallScore: [60-98之间的分数],
    mediator: "[选择更适合调解者角色的类型]",
    provider: "[选择更适合提供者角色的类型]",
    summary: {{
      en: "[100-150字的英文总结，描述两种类型的整体兼容性和关系特点]",
      zh: "[100-150字的中文总结，描述两种类型的整体兼容性和关系特点]"
    }},
    relationshipType: {{
      en: "[简短的关系类型标签，如'Soul Connection'或'Growth Catalysts']",
      zh: "[对应的中文关系类型标签]"
    }},
    relationshipDesc: {{
      en: "[50-70字的英文关系描述]",
      zh: "[50-70字的中文关系描述]"
    }},
    sharedValues: {{
      en: "[共同价值观的英文简短标签]",
      zh: "[共同价值观的中文简短标签]"
    }},
    sharedValuesDesc: {{
      en: "[50-70字的英文共同价值观描述]",
      zh: "[50-70字的中文共同价值观描述]"
    }},
    communicationStyle: {{
      en: "[沟通风格的英文简短标签]",
      zh: "[沟通风格的中文简短标签]"
    }},
    communicationDesc: {{
      en: "[50-70字的英文沟通风格描述]",
      zh: "[50-70字的中文沟通风格描述]"
    }},
    cognitiveCompatibility: {{
      // 下面是认知功能配对，请根据两种类型的实际认知功能填写
      "[认知功能1]_[认知功能2]": {{
        score: [60-95之间的分数],
        type1Function: "[类型1的这个认知功能及位置，如'Fi (Dominant)']",
        type2Function: "[类型2的这个认知功能及位置，如'Te (Auxiliary)']",
        description: {{
          en: "[40-60字的英文认知功能匹配描述]",
          zh: "[40-60字的中文认知功能匹配描述]"
        }}
      }},
      // 包含4对主要认知功能匹配
    }},
    compatibilityReason: {{
      en: "[70-100字的英文兼容性原因分析]",
      zh: "[70-100字的中文兼容性原因分析]"
    }},
    growthPotential: {{
      en: "[50-80字的英文成长潜力描述]",
      zh: "[50-80字的中文成长潜力描述]"
    }},
    faq: [
      {{
        question: {{
          en: "[英文常见问题]",
          zh: "[中文常见问题]"
        }},
        answer: {{
          en: "[50-80字的英文答案]",
          zh: "[50-80字的中文答案]"
        }}
      }}
    ]
  }}
}},
"{type2}": {{
  "{type1}": {{
    // 与上面结构相同，但角度相反
  }}
}}
```

请为MBTI类型 {type1} 和 {type2} 生成完整的兼容性数据。请确保数据结构完整，包含所有必要字段，并且正确实现双向关系（两个方向的数据）。返回的数据应为有效的TypeScript对象。
"""

class MBTICompatibilityGenerator:
    def __init__(self, api_key: str, batch_size: int = 5, delay: int = 3):
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com"
        )
        self.batch_size = batch_size
        self.delay = delay
        self.results = {}
        
        # 创建临时和最终输出目录
        self.temp_dir = "mbti_data"
        self.final_dir = "src/data"
        os.makedirs(self.temp_dir, exist_ok=True)
        os.makedirs(self.final_dir, exist_ok=True)
        
    def generate_compatibility_data(self, type1: str, type2: str) -> Optional[Dict[str, Any]]:
        """为给定的两种MBTI类型生成兼容性数据"""
        pair_key = f"{type1}-{type2}"
        reverse_pair_key = f"{type2}-{type1}"
        
        if pair_key in COMPLETED_PAIRS or reverse_pair_key in COMPLETED_PAIRS:
            print(f"跳过已完成的组合: {pair_key}")
            return None
        
        prompt = PROMPT_TEMPLATE.format(type1=type1, type2=type2)
        
        try:
            print(f"正在生成 {pair_key} 的兼容性数据...")
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": "你是MBTI专家，擅长分析不同类型之间的兼容性。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                stream=False
            )
            
            result = response.choices[0].message.content
            # 保存原始回答
            with open(f"{self.temp_dir}/{pair_key}_raw.txt", "w", encoding="utf-8") as f:
                f.write(result)
            
            return {"type1": type1, "type2": type2, "data": result}
            
        except Exception as e:
            print(f"生成 {pair_key} 数据时出错: {str(e)}")
            return None
    
    def extract_typescript_content(self, text: str) -> str:
        """从API回复中提取TypeScript代码内容"""
        # 先尝试查找typescript代码块
        start_index = text.find("```typescript")
        if start_index == -1:
            # 如果没有typescript标记，尝试查找普通代码块
            start_index = text.find("```")
        
        if start_index != -1:
            # 找到代码块开始位置后，查找第一个{
            start_index = text.find("{", start_index)
            # 找到最后一个}作为结束
            end_index = text.rfind("}")
            if start_index != -1 and end_index != -1:
                return text[start_index:end_index+1]
        
        # 如果找不到标记，尝试直接查找{}括起来的内容
        start_index = text.find("{")
        end_index = text.rfind("}")
        if start_index != -1 and end_index != -1:
            return text[start_index:end_index+1]
        
        # 实在找不到，返回原始文本
        print("警告：无法从回复中提取TypeScript内容，原始文本可能不符合格式要求")
        return text
    
    def process_batch(self, pairs: List[tuple]) -> None:
        """处理一批MBTI类型对"""
        batch_results = {}
        
        for type1, type2 in pairs:
            result = self.generate_compatibility_data(type1, type2)
            if result:
                pair_key = f"{type1}-{type2}"
                ts_content = self.extract_typescript_content(result["data"])
                batch_results[pair_key] = ts_content
                
                # 保存处理后的数据
                with open(f"{self.temp_dir}/{pair_key}.ts", "w", encoding="utf-8") as f:
                    f.write(ts_content)
                
                # 避免API限速
                time.sleep(self.delay)
        
        # 更新总结果
        self.results.update(batch_results)
    
    def generate_all_data(self, start_index: int = 0, end_index: int = None) -> None:
        """生成所有缺失的MBTI兼容性数据"""
        all_pairs = []
        
        for i, type1 in enumerate(MBTI_TYPES):
            for type2 in MBTI_TYPES:
                pair = (type1, type2)
                all_pairs.append(pair)
        
        # 可以选择只处理一部分
        if end_index is None:
            end_index = len(all_pairs)
        
        target_pairs = all_pairs[start_index:end_index]
        total_batches = (len(target_pairs) + self.batch_size - 1) // self.batch_size
        
        # 分批处理
        for i in range(0, len(target_pairs), self.batch_size):
            batch = target_pairs[i:i+self.batch_size]
            batch_num = i // self.batch_size + 1
            print(f"处理批次 {batch_num}/{total_batches}...")
            print(f"组合: {[f'{t1}-{t2}' for t1, t2 in batch]}")
            self.process_batch(batch)
            
            # 每批次后保存一次完整结果
            self.save_results()
    
    def save_results(self) -> None:
        """保存当前所有结果到文件"""
        # 保存中间结果JSON (便于后期处理)
        with open(f"{self.temp_dir}/mbti_compatibility_data.json", "w", encoding="utf-8") as f:
            json.dump(self.results, f, ensure_ascii=False, indent=2)
        
        # 生成最终TypeScript文件
        ts_content = self.generate_typescript_file()
        
        # 保存到临时目录
        with open(f"{self.temp_dir}/compatibilityData.ts", "w", encoding="utf-8") as f:
            f.write(ts_content)
        
        # 保存到项目数据目录
        with open(f"{self.final_dir}/generatedCompatibilityData.ts", "w", encoding="utf-8") as f:
            f.write(ts_content)
            
        print(f"✅ 已保存临时结果到 {self.temp_dir}")
        print(f"✅ 已保存最终TypeScript文件到 {self.final_dir}/generatedCompatibilityData.ts")
    
    def generate_typescript_file(self) -> str:
        """生成完整的TypeScript文件内容"""
        ts_header = "import { CompatibilityResult } from '../types';\n\n"
        ts_header += "export const compatibilityData: Record<string, Record<string, CompatibilityResult>> = {\n"
        
        # 处理所有结果，合并到一个对象中
        all_merged = {}
        for pair_key, content in self.results.items():
            # 清理内容，确保只有对象定义
            cleaned_content = content.strip()
            if cleaned_content.startswith("{") and cleaned_content.endswith("}"):
                try:
                    # 尝试解析JSON (可能需要处理TypeScript特有的格式)
                    # 替换TypeScript特有的写法为有效的JSON
                    json_content = cleaned_content
                    # 替换没有引号的键名
                    import re
                    json_content = re.sub(r'(\s*)(\w+)(:)', r'\1"\2"\3', json_content)
                    # 替换 TS中的 score: 50, 为 "score": 50,
                    json_content = re.sub(r'(\s*)"(\w+)"(\s*):(\s*)([0-9]+)([,\s}])', r'\1"\2"\3:\4\5\6', json_content)
                    
                    try:
                        # 尝试解析修复后的JSON
                        data = json.loads(json_content)
                        # 合并到主对象
                        for type_key, type_data in data.items():
                            if type_key not in all_merged:
                                all_merged[type_key] = {}
                            all_merged[type_key].update(type_data)
                    except json.JSONDecodeError as e:
                        print(f"修复后仍无法解析 {pair_key} 的数据: {str(e)}")
                        print("尝试手动提取基本结构...")
                        
                        # 尝试找到类型键并手动提取
                        type_matches = re.findall(r'"([A-Z]{4})"\s*:\s*{', cleaned_content)
                        if len(type_matches) >= 2:
                            print(f"在 {pair_key} 中找到类型: {type_matches}")
                            # 暂时不处理此复杂情况，提示手动检查
                            print(f"请手动检查 {self.temp_dir}/{pair_key}.ts 文件格式")
                        
                except Exception as e:
                    print(f"处理 {pair_key} 的数据时出错: {str(e)}")
                    print(f"请手动检查 {self.temp_dir}/{pair_key}.ts 文件")
            else:
                print(f"警告：{pair_key} 的数据格式不正确，无法处理")
        
        # 转换回TypeScript格式
        if all_merged:
            ts_content = json.dumps(all_merged, ensure_ascii=False, indent=2)
            # 将JSON格式转换回TypeScript格式（去掉对象键的引号）
            ts_content = ts_content.replace('"overallScore":', 'overallScore:')
            ts_content = ts_content.replace('"mediator":', 'mediator:')
            ts_content = ts_content.replace('"provider":', 'provider:')
            ts_content = ts_content.replace('"score":', 'score:')
            ts_content = ts_content.replace('"type1Function":', 'type1Function:')
            ts_content = ts_content.replace('"type2Function":', 'type2Function:')
            
            return ts_header + ts_content + "\n};\n"
        else:
            return ts_header + "  // 尚未生成任何兼容性数据\n};\n"

def main():
    parser = argparse.ArgumentParser(description='MBTI兼容性数据生成工具')
    parser.add_argument('--api_key', type=str, help='DeepSeek API Key', required=True)
    parser.add_argument('--batch_size', type=int, default=5, help='每批处理的组合数量')
    parser.add_argument('--delay', type=int, default=3, help='每次API调用之间的延迟（秒）')
    parser.add_argument('--start', type=int, default=0, help='起始索引')
    parser.add_argument('--end', type=int, default=None, help='结束索引')
    
    args = parser.parse_args()
    
    generator = MBTICompatibilityGenerator(
        api_key=args.api_key,
        batch_size=args.batch_size,
        delay=args.delay
    )
    
    generator.generate_all_data(args.start, args.end)
    print("\n数据生成完毕！")
    print(f"1. 临时数据目录: {generator.temp_dir}/")
    print(f"2. 最终TypeScript文件: {generator.final_dir}/generatedCompatibilityData.ts")
    print("\n使用说明:")
    print("- 生成的数据可以导入到项目中使用")
    print("- 检查并修复任何格式问题")
    print("- 与现有数据合并: 手动合并或替换src/data/compatibilityData.ts内容")

if __name__ == "__main__":
    main() 