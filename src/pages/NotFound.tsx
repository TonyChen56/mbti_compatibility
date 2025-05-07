import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/seo/SEO';
import CacheControl from '../components/seo/CacheControl';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  const { t } = useLanguage();
  
  // 设置HTTP状态码为404
  useEffect(() => {
    // 对于单页应用，这只是一个元数据标记
    // 真正的404状态码需要在服务器端配置
    document.title = '404 - 页面未找到';
  }, []);
  
  return (
    <Layout>
      <SEO
        title="页面未找到 | MBTI性格兼容性分析工具"
        description="很抱歉，您请求的页面不存在。请返回首页继续浏览我们的MBTI性格兼容性分析工具。"
        canonicalUrl="https://mbti-compatibility.vercel.app/404"
        noIndex={true}
      />
      <CacheControl type="dynamic" />
      
      {/* 设置HTTP状态码 - 只在支持的服务器上生效 */}
      <Helmet>
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
          <p className="mt-4 text-2xl font-medium text-gray-900">页面未找到</p>
          <p className="mt-2 text-lg text-gray-600">
            很抱歉，您请求的页面不存在
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              返回首页
            </Link>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-medium text-gray-900">您可能想要查找：</h2>
            <ul className="mt-4 space-y-2 text-indigo-600">
              <li>
                <Link to="/" className="hover:text-indigo-800 hover:underline">
                  首页 - MBTI兼容性分析工具
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-800 hover:underline">
                  关于 - 了解MBTI性格理论
                </Link>
              </li>
              <li>
                <Link to="/compatibility/INFJ/ENFP" className="hover:text-indigo-800 hover:underline">
                  INFJ和ENFP的兼容性 - 热门组合
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound; 