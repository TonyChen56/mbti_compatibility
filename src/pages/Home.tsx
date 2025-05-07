import React from 'react';
import Layout from '../components/layout/Layout';
import TypeSelector from '../components/compatibility/TypeSelector';
import CompatibilityResult from '../components/compatibility/CompatibilityResult';
import { useLanguage } from '../context/LanguageContext';
import { useCompatibility } from '../context/CompatibilityContext';
import { Brain, Users, Share2, PieChartIcon as ChartPieIcon } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { isCalculated } = useCompatibility();

  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-gradient-to-b from-indigo-50 to-white">
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
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TypeSelector />
        
        {isCalculated ? (
          <CompatibilityResult />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-center text-gray-500">
              {t('cta', 'home')}
            </p>
            
            {/* How it works section */}
            <div className="mt-12">
              <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
                {t('howItWorks', 'home')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step1', 'home')}
                  </h3>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <ChartPieIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step2', 'home')}
                  </h3>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step3', 'home')}
                  </h3>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t('step4', 'home')}
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Popular pairs */}
            <div className="mt-16">
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
            </div>
          </div>
        )}
      </div>
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
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all">
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
        ></div>
      </div>
    </div>
  );
};

export default Home;