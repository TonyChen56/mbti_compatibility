import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CompatibilityResult } from '../../types';
import { mbtiTypes } from '../../data/mbtiTypes';
import html2canvas from 'html2canvas';

interface ShareImageProps {
  type1: string;
  type2: string;
  compatibilityResult: CompatibilityResult;
  onImageGenerated: (imageUrl: string) => void;
}

const ShareImage: React.FC<ShareImageProps> = ({ 
  type1, 
  type2, 
  compatibilityResult, 
  onImageGenerated 
}) => {
  const { language } = useLanguage();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getTypeColor = (typeId: string) => {
    return mbtiTypes.find(type => type.id === typeId)?.color || '#6366F1';
  };

  const type1Color = getTypeColor(type1);
  const type2Color = getTypeColor(type2);

  // 生成图片
  const generateImage = async () => {
    if (!shareCardRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2, // 提高图片质量
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF'
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      onImageGenerated(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 在组件挂载后自动生成图片
  useEffect(() => {
    generateImage();
  }, []);

  // 安全获取翻译
  const getTranslation = (obj: Record<string, string> | undefined) => {
    if (!obj) return '';
    return obj[language as 'en' | 'zh'] || obj.en || '';
  };

  return (
    <div className="hidden">
      {/* 这个div会被html2canvas捕获转换为图片 */}
      <div 
        ref={shareCardRef} 
        className="w-[1200px] h-[630px] bg-white p-10 flex flex-col" 
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* 标题和标志 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">MBTI Match</h1>
          <div className="text-sm text-gray-500">mbti-match.com</div>
        </div>
        
        {/* 兼容性分数圆形图 */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-6 mb-8">
            <div className="text-5xl font-bold" style={{ color: type1Color }}>{type1}</div>
            <div className="text-4xl">+</div>
            <div className="text-5xl font-bold" style={{ color: type2Color }}>{type2}</div>
          </div>
          
          <div className="relative">
            <div className="w-64 h-64 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="w-56 h-56 rounded-full bg-white flex items-center justify-center">
                <div className="text-7xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                  {compatibilityResult.overallScore}%
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="mt-8 text-3xl font-semibold text-center text-gray-800">
            {getTranslation(compatibilityResult.relationshipType)}
          </h2>
          
          <p className="mt-4 text-xl text-center text-gray-600 max-w-2xl">
            {getTranslation(compatibilityResult.summary)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareImage; 