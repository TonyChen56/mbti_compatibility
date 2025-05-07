import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LanguageOption } from '../types';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, section?: string) => string;
  languages: LanguageOption[];
};

// Available languages
const languages: LanguageOption[] = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'zh', name: '中文', flag: '🇨🇳' }
];

// Translations
const translations = {
  en: {
    common: {
      title: 'MBTI Compatibility Chart',
      subtitle: 'Discover how different personality types interact',
      select: 'Select MBTI types',
      type1: 'First Personality Type',
      type2: 'Second Personality Type',
      calculate: 'Calculate Compatibility',
      share: 'Share Results',
      about: 'About',
      faq: 'FAQ',
      language: 'Language',
      compatibility: 'Compatibility',
      score: 'Compatibility Score',
      details: 'Details',
      mediator: 'Mediator',
      provider: 'Provider',
      summary: 'Summary',
      relationshipType: 'Relationship Type',
      sharedValues: 'Shared Values',
      communicationStyle: 'Communication Style',
      cognitiveCompatibility: 'Cognitive Function Compatibility',
      compatibilityReason: 'Compatibility Reason',
      growthPotential: 'Growth Potential',
      showMore: 'Show More',
      showLess: 'Show Less',
      shareText: 'Check out the compatibility between these MBTI personality types!',
      shareTitle: 'MBTI Compatibility Result',
      shareResult: 'Share Result',
      shareOptions: 'Share Options',
      shareImage: 'Share as Image',
      shareOnTwitter: 'Share on Twitter',
      shareOnFacebook: 'Share on Facebook',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      download: 'Download'
    },
    home: {
      hero: 'Discover your personality compatibility',
      description: 'Explore the intricate dynamics between MBTI personality types. Select two types to see their compatibility score, cognitive function match, and detailed relationship analysis.',
      cta: 'Select your types to begin',
      popularPairs: 'Popular Type Pairs',
      recentResults: 'Recent Results',
      howItWorks: 'How It Works',
      step1: 'Select two MBTI personality types',
      step2: 'View detailed compatibility analysis',
      step3: 'Explore cognitive function matches',
      step4: 'Share your results',
    },
    about: {
      title: 'About MBTI Compatibility',
      what: 'What is MBTI?',
      whatText: 'The Myers-Briggs Type Indicator (MBTI) is a personality assessment system that categorizes people into 16 distinct types based on their preferences in four dichotomies: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving.',
      how: 'How we calculate compatibility',
      howText: 'Our compatibility assessment evaluates how cognitive functions interact between two personality types. We analyze the dominant, auxiliary, tertiary, and inferior functions to determine overall compatibility, communication patterns, and growth areas.',
      disclaimer: 'While MBTI compatibility can offer valuable insights into relationships, it\'s important to remember that individual growth, values, and experiences play significant roles in any relationship.'
    }
  },
  zh: {
    common: {
      title: 'MBTI 兼容性图表',
      subtitle: '探索不同性格类型如何互动',
      select: '选择MBTI类型',
      type1: '第一个性格类型',
      type2: '第二个性格类型',
      calculate: '计算兼容性',
      share: '分享结果',
      about: '关于',
      faq: '常见问题',
      language: '语言',
      compatibility: '兼容性',
      score: '兼容性评分',
      details: '详情',
      mediator: '调停者',
      provider: '提供者',
      summary: '概述',
      relationshipType: '关系类型',
      sharedValues: '共同价值观',
      communicationStyle: '沟通风格',
      cognitiveCompatibility: '认知功能兼容性',
      compatibilityReason: '兼容性原因',
      growthPotential: '成长潜力',
      showMore: '显示更多',
      showLess: '收起',
      shareText: '看看这些MBTI性格类型之间的兼容性！',
      shareTitle: 'MBTI兼容性结果',
      shareResult: '分享结果',
      shareOptions: '分享选项',
      shareImage: '以图片形式分享',
      shareOnTwitter: '分享到Twitter',
      shareOnFacebook: '分享到Facebook',
      copyLink: '复制链接',
      copied: '已复制！',
      download: '下载'
    },
    home: {
      hero: '探索你的性格兼容性',
      description: '探索MBTI性格类型之间的复杂动态关系。选择两种类型以查看它们的兼容性评分、认知功能匹配和详细的关系分析。',
      cta: '选择你的类型开始',
      popularPairs: '热门类型配对',
      recentResults: '最近结果',
      howItWorks: '工作原理',
      step1: '选择两种MBTI性格类型',
      step2: '查看详细的兼容性分析',
      step3: '探索认知功能匹配',
      step4: '分享你的结果',
    },
    about: {
      title: '关于MBTI兼容性',
      what: '什么是MBTI？',
      whatText: 'Myers-Briggs类型指标(MBTI)是一种性格评估系统，根据四个二分法中的偏好将人们分为16种不同类型：外向/内向、感觉/直觉、思考/感受和判断/认知。',
      how: '我们如何计算兼容性',
      howText: '我们的兼容性评估评估两种性格类型之间认知功能如何互动。我们分析主导、辅助、第三和劣势功能，以确定整体兼容性、沟通模式和成长领域。',
      disclaimer: '虽然MBTI兼容性可以为关系提供有价值的见解，但重要的是要记住，个人成长、价值观和经验在任何关系中都扮演着重要角色。'
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  languages: languages
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use browser language as default, fallback to English
  const defaultLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'zh' ? 'zh' : 'en';
  };

  const [language, setLanguage] = useState<string>(
    localStorage.getItem('language') || defaultLanguage()
  );

  // Save language preference to localStorage
  const changeLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  // Translation function
  const t = (key: string, section: string = 'common'): string => {
    try {
      return translations[language as keyof typeof translations][section as keyof (typeof translations)['en']][key as keyof (typeof translations)['en']['common']] || key;
    } catch (error) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;