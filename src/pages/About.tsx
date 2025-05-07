import React from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../context/LanguageContext';
import { Brain, Users, Shield, Heart } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {t('title', 'about')}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="prose prose-indigo max-w-none">
              <h2>{t('what', 'about')}</h2>
              <p>{t('whatText', 'about')}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Brain className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Intuition (N) vs Sensing (S)</h3>
                  </div>
                  <p className="text-gray-600">
                    How people gather information. Those who prefer Intuition (N) focus on patterns and possibilities, while those who prefer Sensing (S) focus on concrete facts and details.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Heart className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Thinking (T) vs Feeling (F)</h3>
                  </div>
                  <p className="text-gray-600">
                    How people make decisions. Those who prefer Thinking (T) prioritize logic and consistency, while those who prefer Feeling (F) consider people and special circumstances.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Extraversion (E) vs Introversion (I)</h3>
                  </div>
                  <p className="text-gray-600">
                    Where people focus their attention and get energy. Extraverts (E) direct energy outward and get energized by interactions, while Introverts (I) direct energy inward and get energized by reflection.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Judging (J) vs Perceiving (P)</h3>
                  </div>
                  <p className="text-gray-600">
                    How people approach the outside world. Those who prefer Judging (J) like structure and firm decisions, while those who prefer Perceiving (P) stay flexible and adapt to new information.
                  </p>
                </div>
              </div>
              
              <h2>{t('how', 'about')}</h2>
              <p>{t('howText', 'about')}</p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cognitive Functions</h3>
                <p className="text-gray-600 mb-4">
                  Each MBTI type has a unique "stack" of cognitive functions that determines how they process information and make decisions:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Perceiving Functions</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li><strong>Se (Extraverted Sensing):</strong> Focus on immediate sensory experiences and details</li>
                      <li><strong>Si (Introverted Sensing):</strong> Compare present to past experiences and rely on memory</li>
                      <li><strong>Ne (Extraverted Intuition):</strong> See multiple possibilities and connections</li>
                      <li><strong>Ni (Introverted Intuition):</strong> Focus on underlying patterns and future implications</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Judging Functions</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li><strong>Te (Extraverted Thinking):</strong> Organize external world logically and efficiently</li>
                      <li><strong>Ti (Introverted Thinking):</strong> Analyze and categorize information internally</li>
                      <li><strong>Fe (Extraverted Feeling):</strong> Respond to others' emotional needs and social values</li>
                      <li><strong>Fi (Introverted Feeling):</strong> Make decisions based on personal values and authenticity</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="mt-8 text-gray-500 italic">
                {t('disclaimer', 'about')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;