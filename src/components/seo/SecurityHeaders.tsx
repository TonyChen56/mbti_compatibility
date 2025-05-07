import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * 安全头部组件，用于设置各种安全相关的HTTP头信息
 * 注意：大多数头信息需要通过服务器配置来实现，这里只是提供元标签形式的声明
 */
const SecurityHeaders: React.FC = () => {
  return (
    <Helmet>
      {/* 内容安全策略 */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
      />
      
      {/* 防止MIME类型嗅探攻击 */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      
      {/* 防止点击劫持 */}
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      
      {/* XSS保护 */}
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* 引荐来源策略 */}
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* 权限策略 */}
      <meta
        httpEquiv="Permissions-Policy"
        content="camera=(), microphone=(), geolocation=(), interest-cohort=()"
      />
    </Helmet>
  );
};

export default SecurityHeaders; 