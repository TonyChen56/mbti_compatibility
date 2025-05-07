import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TypeSelector from '../components/compatibility/TypeSelector';
import CompatibilityResult from '../components/compatibility/CompatibilityResult';
import SEO from '../components/seo/SEO';
import CacheControl from '../components/seo/CacheControl';
import FAQSection from '../components/compatibility/FAQSection';
import { useLanguage } from '../context/LanguageContext';
import { useCompatibility } from '../context/CompatibilityContext';
import { Brain, Users, Share2, PieChartIcon as ChartPieIcon } from 'lucide-react';
import useResourceHints, { useCommonConnections } from '../hooks/useResourceHints';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { isCalculated } = useCompatibility();
  
  // 预连接到常用域名
  useCommonConnections();
  
  // 预加载重要资源
  useResourceHints([
    // 预加载导航到兼容性页面可能需要的图标
    { 
      href: '/icons/compatibility-chart.svg', 
      type: 'preload',
      as: 'image'
    },
    // 预加载可能需要的字体
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      type: 'preload',
      as: 'style'
    }
  ]);

  return (
    <Layout>
      <SEO
        title="MBTI性格类型兼容性分析工具 | 探索人格匹配"
        description="通过我们的MBTI性格类型兼容性分析工具，探索16种MBTI类型之间的关系动态，获取关系建议和兼容性评分。"
        canonicalUrl="https://mbti-compatibility.vercel.app/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "MBTI性格类型兼容性分析工具",
          "description": "通过我们的MBTI性格类型兼容性分析工具，探索16种MBTI类型之间的关系动态，获取关系建议和兼容性评分。",
          "url": "https://mbti-compatibility.vercel.app/",
          "applicationCategory": "LifestyleApplication",
          "operatingSystem": "All"
        }}
      />
      {/* 设置缓存控制 - 半静态内容 */}
      <CacheControl type="semi-static" />
      
      {/* Hero section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{t('hero', 'home')}</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {t('description', 'home')}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TypeSelector />
        
        {isCalculated ? (
          <CompatibilityResult />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-center text-gray-500">
              {t('cta', 'home')}
            </p>
            
            {/* How it works section */}
            <section className="mt-12">
              <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
                {t('howItWorks', 'home')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step1', 'home')}
                  </h3>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <ChartPieIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step2', 'home')}
                  </h3>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step3', 'home')}
                  </h3>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step4', 'home')}
                  </h3>
                </div>
              </div>
            </section>
            
            {/* Popular pairs */}
            <section className="mt-16">
              <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
                {t('popularPairs', 'home')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <PopularPairCard type1="INFP" type2="INFJ" score={98} />
                <PopularPairCard type1="ENFP" type2="INTJ" score={92} />
                <PopularPairCard type1="ENFJ" type2="INFP" score={95} />
                <PopularPairCard type1="INTJ" type2="INTP" score={88} />
                <PopularPairCard type1="ENTJ" type2="ISTP" score={84} />
                <PopularPairCard type1="ESFJ" type2="ISFP" score={76} />
              </div>
            </section>
            
            {/* FAQ Section */}
            <FAQSection />
          </div>
        )}
      </main>
    </Layout>
  );
};

interface PopularPairCardProps {
  type1: string;
  type2: string;
  score: number;
}

const PopularPairCard: React.FC<PopularPairCardProps> = ({ type1, type2, score }) => {
  return (
    <Link 
      to={`/compatibility/${type1}/${type2}`}
      className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all block"
      aria-label={`View compatibility between ${type1} and ${type2}`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">{type1} & {type2}</h3>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          score >= 90 ? 'bg-green-100 text-green-800' : 
          score >= 80 ? 'bg-blue-100 text-blue-800' : 
          score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {score}%
        </span>
      </div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${
            score >= 90 ? 'bg-green-500' : 
            score >= 80 ? 'bg-blue-500' : 
            score >= 70 ? 'bg-yellow-500' : 
            'bg-red-500'
          }`} 
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </Link>
  );
};

export default Home;