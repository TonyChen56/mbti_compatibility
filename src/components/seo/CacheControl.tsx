import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CacheControlProps {
  /**
   * 页面类型，用于确定适当的缓存策略
   * - dynamic: 动态内容，不缓存
   * - static: 静态内容，长期缓存
   * - semi-static: 半静态内容，短期缓存
   */
  type: 'dynamic' | 'static' | 'semi-static';
}

/**
 * 缓存控制组件，用于设置HTTP缓存头
 * 
 * 注意：这些头信息需要在服务器端进行配置才能真正生效
 * 此组件主要用于记录页面的缓存意图，以便于服务器配置
 */
const CacheControl: React.FC<CacheControlProps> = ({ type }) => {
  let cacheControlValue = '';
  
  switch (type) {
    // 动态内容：不缓存
    case 'dynamic':
      cacheControlValue = 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
      break;
    
    // 静态内容：长期缓存（1周）
    case 'static':
      cacheControlValue = 'public, max-age=604800, immutable';
      break;
    
    // 半静态内容：短期缓存（1小时）
    case 'semi-static':
      cacheControlValue = 'public, max-age=3600, stale-while-revalidate=86400';
      break;
      
    default:
      // 默认保守策略
      cacheControlValue = 'public, max-age=3600';
  }
  
  return (
    <Helmet>
      <meta httpEquiv="Cache-Control" content={cacheControlValue} />
    </Helmet>
  );
};

export default CacheControl; 