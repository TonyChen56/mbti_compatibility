import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CompatibilityResult } from '../../types';
import ShareButtons from './ShareButtons';
import ShareImage from './ShareImage';
import { Download } from 'lucide-react';

interface ShareOptionsProps {
  type1: string;
  type2: string;
  compatibilityResult: CompatibilityResult;
  shareURL: string;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({
  type1,
  type2,
  compatibilityResult,
  shareURL
}) => {
  const { t } = useLanguage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageGenerated = (url: string) => {
    setImageUrl(url);
  };

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `MBTI-Match-${type1}-${type2}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareText = t('shareText', 'common') || 
    `Check out the compatibility between ${type1} and ${type2} personality types!`;
  
  const shareTitle = t('shareTitle', 'common') || 
    `${type1} & ${type2} MBTI Compatibility - ${compatibilityResult.overallScore}% Match`;

  return (
    <div className="mt-6">
      {/* 分享图片生成器组件 (隐藏渲染) */}
      {!imageUrl && (
        <ShareImage
          type1={type1}
          type2={type2}
          compatibilityResult={compatibilityResult}
          onImageGenerated={handleImageGenerated}
        />
      )}

      {/* 分享选项 */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">
          {t('shareOptions', 'common') || 'Share Options'}
        </h3>
        <ShareButtons
          title={shareTitle}
          text={shareText}
          url={shareURL}
        />
      </div>

      {/* 分享图片部分 */}
      {imageUrl && (
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {t('shareImage', 'common') || 'Share as Image'}
            </h3>
            <button
              onClick={handleDownloadImage}
              className="inline-flex items-center px-3 py-1 text-sm rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              {t('download', 'common') || 'Download'}
            </button>
          </div>
          <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={`${type1} and ${type2} compatibility`} 
              className="w-full h-auto"
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareOptions; 