import React from 'react';
import { Heart, Compass, Users, Lightbulb, Puzzle, Sparkles, Target, Zap, Braces, Share2 } from 'lucide-react';

interface CompatibilityIconProps {
  type1: string;
  type2: string;
  score: number;
  size?: number;
  className?: string;
}

// MBTI类型组合的主题图标
const CompatibilityIcons: React.FC<CompatibilityIconProps> = ({
  type1,
  type2,
  score,
  size = 24,
  className = ''
}) => {
  const getIconForTypes = () => {
    // 根据MBTI类型组合特性选择图标
    
    // 情侣关系组合
    if ((type1 === 'ENFP' && type2 === 'INTJ') || 
        (type1 === 'INTJ' && type2 === 'ENFP') || 
        (type1 === 'INFP' && type2 === 'ENTJ') || 
        (type1 === 'ENTJ' && type2 === 'INFP')) {
      return <Heart size={size} className={`text-pink-500 ${className}`} />;
    }
    
    // 思想者组合
    if ((type1 === 'INTP' && type2 === 'INTJ') || 
        (type1 === 'INTJ' && type2 === 'INTP') || 
        (type1 === 'ENTP' && type2 === 'ENTJ') || 
        (type1 === 'ENTJ' && type2 === 'ENTP')) {
      return <Braces size={size} className={`text-indigo-500 ${className}`} />;
    }
    
    // 互补组合
    if ((type1 === 'ENFJ' && type2 === 'ISTP') || 
        (type1 === 'ISTP' && type2 === 'ENFJ') || 
        (type1 === 'ESFJ' && type2 === 'INTP') || 
        (type1 === 'INTP' && type2 === 'ESFJ')) {
      return <Puzzle size={size} className={`text-green-500 ${className}`} />;
    }
    
    // 有创造力的组合
    if ((type1 === 'ENFP' && type2 === 'ENFP') || 
        (type1 === 'ENTP' && type2 === 'ENFP') || 
        (type1 === 'INFP' && type2 === 'INFP')) {
      return <Sparkles size={size} className={`text-yellow-500 ${className}`} />;
    }
    
    // 社交伙伴组合
    if ((type1 === 'ESFJ' && type2 === 'ESFP') || 
        (type1 === 'ESFP' && type2 === 'ESFJ') || 
        (type1 === 'ESFP' && type2 === 'ENFJ')) {
      return <Users size={size} className={`text-blue-500 ${className}`} />;
    }
    
    // 指导者-学习者组合
    if ((type1 === 'ESTJ' && type2 === 'ISFP') || 
        (type1 === 'ISFP' && type2 === 'ESTJ')) {
      return <Compass size={size} className={`text-gray-500 ${className}`} />;
    }
    
    // 智慧组合
    if ((type1 === 'INFJ' && type2 === 'INFJ') || 
        (type1 === 'INTJ' && type2 === 'INFJ')) {
      return <Lightbulb size={size} className={`text-amber-500 ${className}`} />;
    }
    
    // 行动导向组合
    if ((type1 === 'ESTJ' && type2 === 'ENTJ') || 
        (type1 === 'ENTJ' && type2 === 'ESTJ') || 
        (type1 === 'ESTP' && type2 === 'ISTP')) {
      return <Target size={size} className={`text-red-500 ${className}`} />;
    }
    
    // 动态组合
    if ((type1 === 'ENFP' && type2 === 'ESFP') || 
        (type1 === 'ESFP' && type2 === 'ENFP')) {
      return <Zap size={size} className={`text-purple-500 ${className}`} />;
    }
    
    // 默认图标 - 基于兼容性分数
    if (score >= 80) {
      return <Sparkles size={size} className={`text-yellow-500 ${className}`} />;
    } else if (score >= 70) {
      return <Puzzle size={size} className={`text-green-500 ${className}`} />;
    } else if (score >= 60) {
      return <Compass size={size} className={`text-blue-500 ${className}`} />;
    } else {
      return <Share2 size={size} className={`text-gray-500 ${className}`} />;
    }
  };

  return getIconForTypes();
};

export default CompatibilityIcons; 