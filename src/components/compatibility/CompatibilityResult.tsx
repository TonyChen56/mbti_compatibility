import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCompatibility } from '../../context/CompatibilityContext';
import { mbtiTypes } from '../../data/mbtiTypes';
import { Share2, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import CognitiveFunction from './CognitiveFunction';
import RelationshipCard from './RelationshipCard';
import CompatibilityChart from './CompatibilityChart';
import FAQSection from './FAQSection';
import ShareOptions from '../social/ShareOptions';
import CompatibilityIcons from './CompatibilityIcons';

// 为不同组合定义不同的图案
const getPatternForCombination = (type1: string, type2: string, score: number) => {
  // 根据兼容性分数类别
  if (score >= 90) {
    return 'excellent';
  } else if (score >= 75) {
    return 'good';
  } else if (score >= 60) {
    return 'average';
  } else {
    return 'challenging';
  }
};

const CompatibilityResult: React.FC = () => {
  const { t, language } = useLanguage();
  const { type1, type2, compatibilityResult, shareURL } = useCompatibility();
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [patternSvg, setPatternSvg] = useState<string | null>(null);

  // 生成或选择图案
  useEffect(() => {
    if (!compatibilityResult) return;
    
    const pattern = getPatternForCombination(type1, type2, compatibilityResult.overallScore);
    
    // 根据pattern类型生成不同的图形
    let svg = '';
    
    if (pattern === 'excellent') {
      // 星星图案 - 非常契合的关系
      svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 L58 35 L80 35 L65 50 L72 70 L50 60 L28 70 L35 50 L20 35 L42 35 Z" fill="white" stroke="white" stroke-width="1" />
          <circle cx="50" cy="50" r="35" stroke="white" stroke-width="2" fill="none" stroke-dasharray="5,3" />
        </svg>
      `;
    } else if (pattern === 'good') {
      // 心形图案 - 良好的关系
      svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 75 C50 75 15 40 35 25 C45 15 50 20 50 20 C50 20 55 15 65 25 C85 40 50 75 50 75 Z" fill="none" stroke="white" stroke-width="2" />
          <circle cx="50" cy="50" r="35" stroke="white" stroke-width="2" fill="none" />
        </svg>
      `;
    } else if (pattern === 'average') {
      // 平衡图案 - 中等关系
      svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" stroke="white" stroke-width="2" fill="none" />
          <path d="M30 50 L70 50 M50 30 L50 70" stroke="white" stroke-width="2" />
        </svg>
      `;
    } else {
      // 挑战图案 - 有挑战的关系
      svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" stroke="white" stroke-width="2" fill="none" />
          <path d="M35 35 L65 65 M65 35 L35 65" stroke="white" stroke-width="2" />
        </svg>
      `;
    }
    
    setPatternSvg(svg);
  }, [type1, type2, compatibilityResult]);

  if (!compatibilityResult) {
    return null;
  }

  const getTypeColor = (typeId: string) => {
    return mbtiTypes.find(type => type.id === typeId)?.color || '#6366F1';
  };

  const type1Color = getTypeColor(type1);
  const type2Color = getTypeColor(type2);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${type1} & ${type2} MBTI Compatibility`,
          text: `Check out the compatibility between ${type1} and ${type2} personality types!`,
          url: shareURL,
        });
      } else {
        await navigator.clipboard.writeText(shareURL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Safely access translations with fallback to empty string
  const getTranslation = (obj: Record<string, string> | undefined) => {
    return obj?.[language as keyof typeof obj] || '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all">
      {/* Header with score */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 sm:p-10 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{t('compatibility', 'common')}</h2>
            <p className="text-indigo-100 mt-1">{type1} & {type2}</p>
          </div>
          <button 
            onClick={handleShare}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
            aria-label="Share results"
          >
            {copied ? <Copy className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="mt-4 flex justify-center">
          {/* 添加主题图标 */}
          <div className="bg-white bg-opacity-10 p-3 rounded-full mb-2">
            <CompatibilityIcons 
              type1={type1}
              type2={type2}
              score={compatibilityResult.overallScore}
              size={40}
              className="text-white"
            />
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-flex">
              <svg className="w-40 h-40" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeDasharray={`${compatibilityResult.overallScore}, 100`}
                  className="animate-dash"
                />
                
                {/* 使用动态生成的SVG图案 */}
                {patternSvg && (
                  <g dangerouslySetInnerHTML={{ __html: patternSvg }} />
                )}
                
                <text x="18" y="20.5" className="text-white fill-current text-5xl font-bold text-center" textAnchor="middle">
                  {compatibilityResult.overallScore}%
                </text>
              </svg>
            </div>
            <p className="mt-2 font-medium text-lg text-white">{t('score', 'common')}</p>
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm font-medium text-gray-500">{t('mediator', 'common')}</p>
            <p className="text-lg font-semibold" style={{ color: getTypeColor(compatibilityResult.mediator) }}>
              {compatibilityResult.mediator}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{t('provider', 'common')}</p>
            <p className="text-lg font-semibold" style={{ color: getTypeColor(compatibilityResult.provider) }}>
              {compatibilityResult.provider}
            </p>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('summary', 'common')}</h3>
        <p className="text-gray-600">
          {getTranslation(compatibilityResult.summary)}
        </p>
      </div>
      
      {/* Relationship cards */}
      <div className="px-6 pb-6">
        <RelationshipCard 
          title={getTranslation(compatibilityResult.relationshipType)}
          description={getTranslation(compatibilityResult.relationshipDesc)}
          type="relationship"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <RelationshipCard 
            title={getTranslation(compatibilityResult.sharedValues)}
            description={getTranslation(compatibilityResult.sharedValuesDesc)}
            type="values"
          />
          <RelationshipCard 
            title={getTranslation(compatibilityResult.communicationStyle)}
            description={getTranslation(compatibilityResult.communicationDesc)}
            type="communication"
          />
        </div>
        
        <ShareOptions
          type1={type1}
          type2={type2}
          compatibilityResult={compatibilityResult}
          shareURL={shareURL}
        />
      </div>
      
      {/* Compatibility chart */}
      <div className="px-6 pb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('cognitiveCompatibility', 'common')}</h3>
        <CompatibilityChart 
          compatibilityData={compatibilityResult.cognitiveCompatibility} 
          type1={type1} 
          type2={type2} 
          type1Color={type1Color} 
          type2Color={type2Color}
        />
      </div>
      
      {/* Toggle details button */}
      <button
        onClick={toggleDetails}
        className="w-full px-6 py-3 flex justify-center items-center text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-all border-t border-gray-200"
      >
        {showDetails ? (
          <>
            <ChevronUp className="h-4 w-4 mr-1" />
            {t('showLess', 'common')}
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-1" />
            {t('showMore', 'common')}
          </>
        )}
      </button>
      
      {/* Detailed sections - only shown when expanded */}
      {showDetails && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-200">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('compatibilityReason', 'common')}</h3>
            <p className="text-gray-600">
              {getTranslation(compatibilityResult.compatibilityReason)}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('growthPotential', 'common')}</h3>
            <p className="text-gray-600">
              {getTranslation(compatibilityResult.growthPotential)}
            </p>
          </div>
          
          {/* Cognitive Function Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Cognitive Functions Explained</h3>
            <div className="space-y-4 mt-4">
              {Object.keys(compatibilityResult.cognitiveCompatibility).map(key => (
                <CognitiveFunction 
                  key={key}
                  pairKey={key}
                  data={compatibilityResult.cognitiveCompatibility[key]}
                  language={language}
                />
              ))}
            </div>
          </div>
          
          {/* FAQ Section */}
          {compatibilityResult.faq && compatibilityResult.faq.length > 0 && (
            <FAQSection faqs={compatibilityResult.faq} language={language} />
          )}
        </div>
      )}
    </div>
  );
};

export default CompatibilityResult;