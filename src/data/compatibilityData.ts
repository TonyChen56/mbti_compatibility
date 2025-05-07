import { CompatibilityResult } from '../types';

// 基本兼容性数据（保留原有的几个示例）
const baseCompatibilityData: Record<string, Record<string, CompatibilityResult>> = {
  "INFP": {
    "INFJ": {
      overallScore: 95,
      mediator: "INFJ",
      provider: "INFP",
      summary: {
        en: "INFP and INFJ share a deep understanding and connection through their shared intuitive and feeling preferences. Their relationship is characterized by mutual support, emotional depth, and creative exploration.",
        zh: "INFP和INFJ通过共同的直觉和感受偏好建立深刻的理解和联系。他们的关系以相互支持、情感深度和创造性探索为特征。"
      },
      relationshipType: {
        en: "Soul Connection",
        zh: "灵魂伴侣"
      },
      relationshipDesc: {
        en: "A harmonious partnership built on shared values, deep understanding, and mutual growth.",
        zh: "建立在共同价值观、深刻理解和共同成长基础上的和谐伙伴关系。"
      },
      sharedValues: {
        en: "Authenticity and Growth",
        zh: "真实性与成长"
      },
      sharedValuesDesc: {
        en: "Both types value personal growth, authenticity, and making a positive impact on others.",
        zh: "两种类型都重视个人成长、真实性和对他人产生积极影响。"
      },
      communicationStyle: {
        en: "Deep and Meaningful",
        zh: "深入而有意义"
      },
      communicationDesc: {
        en: "Communication focuses on sharing insights, feelings, and exploring complex ideas together.",
        zh: "沟通注重分享见解、感受，共同探索复杂的想法。"
      },
      cognitiveCompatibility: {
        "Fi_Fe": {
          score: 90,
          type1Function: "Fi (Dominant)",
          type2Function: "Fe (Auxiliary)",
          description: {
            en: "INFP's strong personal values complement INFJ's focus on harmony and others' needs.",
            zh: "INFP的强烈个人价值观与INFJ对和谐与他人需求的关注相辅相成。"
          }
        },
        "Ne_Ni": {
          score: 95,
          type1Function: "Ne (Auxiliary)",
          type2Function: "Ni (Dominant)",
          description: {
            en: "Their intuitive functions work together to create deep insights and possibilities.",
            zh: "他们的直觉功能协同工作，创造深刻的洞察力和可能性。"
          }
        },
        "Si_Se": {
          score: 85,
          type1Function: "Si (Tertiary)",
          type2Function: "Se (Tertiary)",
          description: {
            en: "Both can help each other develop better awareness of practical details.",
            zh: "双方可以帮助对方更好地意识到实际细节。"
          }
        },
        "Te_Ti": {
          score: 80,
          type1Function: "Te (Inferior)",
          type2Function: "Ti (Inferior)",
          description: {
            en: "They can support each other in developing logical thinking and decision-making.",
            zh: "他们可以在发展逻辑思维和决策方面相互支持。"
          }
        }
      },
      compatibilityReason: {
        en: "The high compatibility between INFP and INFJ comes from their shared idealism, deep emotional understanding, and complementary cognitive functions.",
        zh: "INFP和INFJ之间的高度兼容性来自于他们共同的理想主义、深刻的情感理解和互补的认知功能。"
      },
      growthPotential: {
        en: "Together, they can develop stronger practical skills while maintaining their idealistic vision and emotional depth.",
        zh: "在一起，他们可以在保持理想主义愿景和情感深度的同时发展更强的实践技能。"
      },
      faq: [
        {
          question: {
            en: "How can INFP and INFJ handle conflict?",
            zh: "INFP和INFJ如何处理冲突？"
          },
          answer: {
            en: "They should focus on open communication and understanding each other's perspectives, while giving space when needed.",
            zh: "他们应该注重开放的沟通和理解彼此的观点，同时在需要时给予对方空间。"
          }
        }
      ]
    },
    "ENTJ": {
      overallScore: 85,
      mediator: "INFP",
      provider: "ENTJ",
      summary: {
        en: "INFP and ENTJ form a dynamic partnership that balances feeling and thinking preferences. Their differences create opportunities for growth and learning.",
        zh: "INFP和ENTJ形成平衡感受和思维偏好的动态伙伴关系。他们的差异创造了成长和学习的机会。"
      },
      relationshipType: {
        en: "Growth Catalysts",
        zh: "成长催化剂"
      },
      relationshipDesc: {
        en: "A relationship that promotes personal development through complementary strengths.",
        zh: "通过互补优势促进个人发展的关系。"
      },
      sharedValues: {
        en: "Achievement and Authenticity",
        zh: "成就与真实"
      },
      sharedValuesDesc: {
        en: "Both types value personal growth and making a meaningful impact in their own ways.",
        zh: "两种类型都以自己的方式重视个人成长和产生有意义的影响。"
      },
      communicationStyle: {
        en: "Balanced and Growth-oriented",
        zh: "平衡且面向成长"
      },
      communicationDesc: {
        en: "Communication combines emotional depth with practical goal-setting and achievement.",
        zh: "沟通结合情感深度与实际目标设定和实现。"
      },
      cognitiveCompatibility: {
        "Fi_Te": {
          score: 90,
          type1Function: "Fi (Dominant)",
          type2Function: "Te (Dominant)",
          description: {
            en: "INFP's values and authenticity balance ENTJ's efficiency and organization.",
            zh: "INFP的价值观和真实性平衡了ENTJ的效率和组织。"
          }
        },
        "Ne_Ni": {
          score: 85,
          type1Function: "Ne (Auxiliary)",
          type2Function: "Ni (Auxiliary)",
          description: {
            en: "Their intuitive functions work together to create innovative solutions.",
            zh: "他们的直觉功能协同工作，创造创新解决方案。"
          }
        },
        "Si_Se": {
          score: 75,
          type1Function: "Si (Tertiary)",
          type2Function: "Se (Tertiary)",
          description: {
            en: "Both can help each other develop better awareness of details and experiences.",
            zh: "双方可以帮助对方更好地意识到细节和经验。"
          }
        },
        "Te_Fi": {
          score: 80,
          type1Function: "Te (Inferior)",
          type2Function: "Fi (Inferior)",
          description: {
            en: "They can support each other in developing emotional awareness and practical skills.",
            zh: "他们可以在发展情感意识和实践技能方面相互支持。"
          }
        }
      },
      compatibilityReason: {
        en: "The strong compatibility between INFP and ENTJ comes from their complementary functions and shared desire for growth.",
        zh: "INFP和ENTJ之间的强大兼容性来自于他们的互补功能和共同的成长愿望。"
      },
      growthPotential: {
        en: "Together, they can develop more balanced approaches to decision-making and personal development.",
        zh: "在一起，他们可以发展更平衡的决策和个人发展方法。"
      },
      faq: [
        {
          question: {
            en: "How can INFP and ENTJ bridge their communication differences?",
            zh: "INFP和ENTJ如何弥合沟通差异？"
          },
          answer: {
            en: "By appreciating each other's perspectives and finding middle ground between emotional and logical approaches.",
            zh: "通过欣赏彼此的观点，在情感和逻辑方法之间找到平衡点。"
          }
        }
      ]
    }
  },
  
  "ISTP": {
    "ESFP": {
      overallScore: 82,
      mediator: "ISTP",
      provider: "ESFP",
      summary: {
        en: "ISTP and ESFP form an exciting and dynamic partnership. Both types share a love for action, hands-on experiences, and living in the present moment. Their shared Se function creates a strong foundation for understanding and mutual enjoyment.",
        zh: "ISTP和ESFP形成充满活力的伙伴关系。两种类型都热爱行动、实践体验和当下生活。共同的Se功能为理解和互享创造了坚实基础。"
      },
      relationshipType: {
        en: "Adventure Partners",
        zh: "冒险伙伴"
      },
      relationshipDesc: {
        en: "Your relationship thrives on shared experiences and practical problem-solving. You both enjoy exploring the physical world and taking on new challenges together.",
        zh: "你们的关系在共同经历和实际问题解决中蓬勃发展。你们都喜欢探索物质世界，共同应对新挑战。"
      },
      sharedValues: {
        en: "Freedom and Experience",
        zh: "自由与体验"
      },
      sharedValuesDesc: {
        en: "Both types value personal freedom and hands-on experiences. You share a practical approach to life and enjoy living in the moment.",
        zh: "两种类型都重视个人自由和实践体验。你们对生活采取实用的态度，享受当下时刻。"
      },
      communicationStyle: {
        en: "Direct and Action-oriented",
        zh: "直接且行动导向"
      },
      communicationDesc: {
        en: "Communication focuses on practical matters and immediate experiences. Both types prefer showing over telling and action over words.",
        zh: "沟通聚焦于实际事务和即时体验。两种类型都倾向于用行动代替言语，更喜欢展示而非讲述。"
      },
      cognitiveCompatibility: {
        "Ti_Te": {
          score: 75,
          type1Function: "Ti (Dominant)",
          type2Function: "Te (Tertiary)",
          description: {
            en: "ISTP's analytical thinking complements ESFP's practical organization skills.",
            zh: "ISTP的分析思维与ESFP的实用组织能力相辅相成。"
          }
        },
        "Se_Se": {
          score: 95,
          type1Function: "Se (Auxiliary)",
          type2Function: "Se (Dominant)",
          description: {
            en: "Shared Se creates strong connection through mutual appreciation of sensory experiences and action.",
            zh: "共同的Se通过对感官体验和行动的共同欣赏创造强烈联系。"
          }
        },
        "Ni_Ni": {
          score: 70,
          type1Function: "Ni (Tertiary)",
          type2Function: "Ni (Inferior)",
          description: {
            en: "Both types may struggle with long-term planning but can support each other's growth.",
            zh: "两种类型在长期规划方面可能都有困难，但可以支持彼此成长。"
          }
        },
        "Fe_Fi": {
          score: 65,
          type1Function: "Fe (Inferior)",
          type2Function: "Fi (Auxiliary)",
          description: {
            en: "ESFP's Fi helps ISTP develop emotional awareness while ISTP provides logical clarity.",
            zh: "ESFP的Fi帮助ISTP发展情感意识，而ISTP提供逻辑清晰度。"
          }
        }
      },
      compatibilityReason: {
        en: "The solid compatibility between ISTP and ESFP stems from their shared love for hands-on experiences and present-moment living. While they approach life from slightly different angles, their similar preferences create natural harmony.",
        zh: "ISTP和ESFP之间的可靠兼容性源于他们对实践体验和当下生活的共同热爱。虽然他们从略微不同的角度看待生活，但相似的偏好创造了自然和谐。"
      },
      growthPotential: {
        en: "This pairing offers growth through balancing spontaneity with analysis. ISTP can help ESFP develop more systematic thinking, while ESFP can help ISTP connect with their emotions and interpersonal skills.",
        zh: "这种配对通过平衡自发性和分析提供成长。ISTP可以帮助ESFP发展更系统的思维，而ESFP可以帮助ISTP与情感和人际技能建立联系。"
      },
      faq: [
        {
          question: {
            en: "What challenges might ISTP and ESFP face?",
            zh: "ISTP和ESFP可能面临哪些挑战？"
          },
          answer: {
            en: "They may struggle with commitment to long-term plans and communication about deeper feelings. Finding balance between enjoyment and responsibility can also be challenging.",
            zh: "他们可能难以承诺长期计划并沟通更深层次的感受。在享受和责任之间找到平衡也可能具有挑战性。"
          }
        }
      ]
    }
  },
  "ESFP": {
    "ISTP": {
      overallScore: 82,
      mediator: "ESFP",
      provider: "ISTP",
      summary: {
        en: "ESFP and ISTP share a dynamic connection rooted in their appreciation for sensory experiences and practical action. While ESFP brings enthusiasm and social energy, ISTP contributes analytical problem-solving and technical skills. Their complementary strengths create a balanced and exciting partnership.",
        zh: "ESFP和ISTP建立了一种动态联系，根植于他们对感官体验和实际行动的欣赏。ESFP带来热情和社交能量，而ISTP贡献分析性问题解决和技术技能。他们互补的优势创造了平衡且令人兴奋的伙伴关系。"
      },
      relationshipType: {
        en: "Experience Seekers",
        zh: "体验追求者"
      },
      relationshipDesc: {
        en: "A vibrant partnership that balances social engagement with technical mastery, creating practical solutions and memorable experiences.",
        zh: "一种充满活力的伙伴关系，平衡社交参与和技术精通，创造实用解决方案和难忘体验。"
      },
      sharedValues: {
        en: "Action & Reality",
        zh: "行动与现实"
      },
      sharedValuesDesc: {
        en: "Both types appreciate direct experience, practicality, and living in the present moment without pretense.",
        zh: "两种类型都欣赏直接体验、实用性和不做作地活在当下。"
      },
      communicationStyle: {
        en: "Straight to the Point",
        zh: "开门见山"
      },
      communicationDesc: {
        en: "Communication is practical and reality-based, focusing on concrete actions rather than abstract theories.",
        zh: "沟通实用且基于现实，专注于具体行动而非抽象理论。"
      },
      cognitiveCompatibility: {
        "Se_Se": {
          score: 95,
          type1Function: "Se (Dominant)",
          type2Function: "Se (Auxiliary)",
          description: {
            en: "Strong Se connection creates mutual understanding and enjoyment of sensory experiences.",
            zh: "强大的Se连接创造了对感官体验的相互理解和享受。"
          }
        },
        "Fi_Ti": {
          score: 75,
          type1Function: "Fi (Auxiliary)",
          type2Function: "Ti (Dominant)",
          description: {
            en: "ESFP's values complement ISTP's logical analysis, creating balanced decision-making.",
            zh: "ESFP的价值观补充了ISTP的逻辑分析，创造平衡的决策。"
          }
        },
        "Te_Fe": {
          score: 70,
          type1Function: "Te (Tertiary)",
          type2Function: "Fe (Inferior)",
          description: {
            en: "Both have weaker but developing external judgment functions that can grow together.",
            zh: "两者都有较弱但正在发展的外部判断功能，可以共同成长。"
          }
        },
        "Ni_Ni": {
          score: 65,
          type1Function: "Ni (Inferior)",
          type2Function: "Ni (Tertiary)",
          description: {
            en: "ISTP's more developed Ni can help guide ESFP's future planning abilities.",
            zh: "ISTP更发达的Ni可以帮助指导ESFP的未来规划能力。"
          }
        }
      },
      compatibilityReason: {
        en: "The strong compatibility between ESFP and ISTP comes from their shared Se function, creating mutual understanding and enjoyment of physical experiences, while their different judgment functions (Fi/Ti) provide complementary perspectives.",
        zh: "ESFP和ISTP之间的强兼容性来自他们共享的Se功能，创造对物理体验的相互理解和享受，而他们不同的判断功能(Fi/Ti)提供互补的视角。"
      },
      growthPotential: {
        en: "Together they can develop greater balance between spontaneity and planning, with ESFP learning analytical skills from ISTP, and ISTP developing greater social and emotional awareness through ESFP.",
        zh: "他们可以共同在自发性和计划之间发展更大平衡，ESFP从ISTP学习分析技能，ISTP通过ESFP发展更强的社交和情感意识。"
      },
      faq: [
        {
          question: {
            en: "How can ESFP help draw out the more reserved ISTP?",
            zh: "ESFP如何帮助引导更内敛的ISTP？"
          },
          answer: {
            en: "By creating comfortable social situations focused on shared interests and activities rather than forced emotional discussion.",
            zh: "通过创造专注于共同兴趣和活动的舒适社交情境，而非强制情感讨论。"
          }
        }
      ]
    }
  }
};

/**
 * 动态加载兼容性数据
 * 
 * @param type1 第一个MBTI类型
 * @param type2 第二个MBTI类型
 * @param isRetry 是否为反转类型后的重试
 * @returns 兼容性数据Promise
 */
export async function getCompatibilityData(
  type1: string, 
  type2: string,
  isRetry: boolean = false
): Promise<CompatibilityResult | null> {
  // 首先从基本数据中查找
  if (baseCompatibilityData[type1]?.[type2]) {
    return baseCompatibilityData[type1][type2];
  }
  
  try {
    // 尝试从拆分的文件中导入数据
    const modulePath = `./compatibility/${type1}-${type2}.ts`;
    const module = await import(/* @vite-ignore */ modulePath);
    
    // 确保模块存在且包含正确的数据结构
    if (module && module.default && module.default[type1]?.[type2]) {
      return module.default[type1][type2];
    }
    
    // 如果没有找到数据，尝试反转类型进行查找（仅在非重试状态下）
    if (type1 !== type2 && !isRetry) {
      return getCompatibilityData(type2, type1, true);
    }
    
    return null;
  } catch (error) {
    // 只在非重试状态下记录错误
    if (!isRetry) {
      console.error(`Failed to load compatibility data for ${type1}-${type2}:`, error);
    }
    
    // 如果没有找到数据，尝试反转类型进行查找（仅在非重试状态下）
    if (type1 !== type2 && !isRetry) {
      return getCompatibilityData(type2, type1, true);
    }
    
    return null;
  }
}

// 为了向后兼容，仍然导出基本数据对象
export const compatibilityData = baseCompatibilityData;