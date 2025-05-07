import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/seo/SEO';
import CacheControl from '../components/seo/CacheControl';
import CompatibilityResult from '../components/compatibility/CompatibilityResult';
import FAQSection from '../components/compatibility/FAQSection';
import { useLanguage } from '../context/LanguageContext';
import { useCompatibility } from '../context/CompatibilityContext';
import { isValidMbtiType } from '../data/mbtiTypes';
import useResourceHints from '../hooks/useResourceHints';

const CompatibilityPage: React.FC = () => {
  const { type1, type2 } = useParams<{ type1: string; type2: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { setType1, setType2, calculateCompatibility } = useCompatibility();

  // 预加载与兼容性相关的资源
  useResourceHints([
    // 预加载可能需要的图表资源
    { 
      href: '/assets/compatibility-chart.svg', 
      type: 'preload',
      as: 'image' 
    }
  ]);

  useEffect(() => {
    // 验证URL中的MBTI类型
    if (!type1 || !type2 || !isValidMbtiType(type1.toUpperCase()) || !isValidMbtiType(type2.toUpperCase())) {
      // 如果无效，重定向到首页
      navigate('/');
      return;
    }
    
    // 设置类型并计算兼容性
    setType1(type1.toUpperCase());
    setType2(type2.toUpperCase());
    calculateCompatibility();
  }, [type1, type2, setType1, setType2, calculateCompatibility, navigate]);

  if (!type1 || !type2) return null;

  const pageTitle = `${type1.toUpperCase()} 和 ${type2.toUpperCase()} 的兼容性分析 | MBTI性格匹配`;
  const pageDescription = `探索${type1.toUpperCase()}和${type2.toUpperCase()}的MBTI性格类型兼容性，了解他们之间的关系动态、优势和潜在挑战。`;
  const canonicalUrl = `https://mbti-compatibility.vercel.app/compatibility/${type1.toUpperCase()}/${type2.toUpperCase()}`;
  const keywords = `MBTI, 兼容性, ${type1.toUpperCase()}, ${type2.toUpperCase()}, 性格匹配, 性格类型, 关系`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        keywords={keywords}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": pageTitle,
          "description": pageDescription,
          "keywords": keywords,
          "url": canonicalUrl,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        }}
      />
      {/* 设置缓存控制 - 静态内容 */}
      <CacheControl type="static" />
      
      <section className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{type1.toUpperCase()} + {type2.toUpperCase()}</span>
              <span className="block text-3xl mt-3 text-indigo-600">{t('compatibility', 'common')}</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {t('compatibilitySubtitle', 'common')} {type1.toUpperCase()} 和 {type2.toUpperCase()} 的关系动态和兼容性
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article itemScope itemType="https://schema.org/Article">
          <meta itemProp="name" content={pageTitle} />
          <meta itemProp="description" content={pageDescription} />
          <meta itemProp="keywords" content={keywords} />
          
          <div className="mb-8 prose prose-indigo mx-auto">
            <p className="lead text-lg text-gray-600">
              想要了解<strong>{type1.toUpperCase()}</strong>和<strong>{type2.toUpperCase()}</strong>的兼容性？
              本页面提供了关于这两种MBTI性格类型之间的详细兼容性分析，包括它们的关系动态、沟通方式、潜在挑战和成长机会。
            </p>
          </div>
          
          <CompatibilityResult />
          
          <section className="mt-12 bg-gray-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">关于 {type1.toUpperCase()} 和 {type2.toUpperCase()} 的常见问题</h2>
            <FAQSection />
          </section>
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">探索其他MBTI兼容性组合</h2>
            <p className="text-gray-600 mb-6">
              除了 {type1.toUpperCase()} 和 {type2.toUpperCase()} 的组合，您还可以探索其他MBTI类型之间的兼容性：
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['INFP', 'ENFP', 'INFJ', 'ENFJ', 'INTJ', 'ENTJ', 'INTP', 'ENTP'].map(type => (
                type !== type1.toUpperCase() && type !== type2.toUpperCase() && (
                  <a 
                    key={type} 
                    href={`/compatibility/${type}/${type1.toUpperCase()}`}
                    className="bg-white p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm text-center"
                  >
                    {type} + {type1.toUpperCase()}
                  </a>
                )
              ))}
            </div>
          </section>
        </article>
      </div>
    </Layout>
  );
};

export default CompatibilityPage; 