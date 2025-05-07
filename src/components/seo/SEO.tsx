import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
}

const defaultTitle = 'MBTI性格类型兼容性分析工具 | 探索人格匹配';
const defaultDescription = '通过我们的MBTI性格类型兼容性分析工具，探索16种MBTI类型之间的关系动态，获取关系建议和兼容性评分。';
const defaultOgImage = 'https://mbti-compatibility.vercel.app/og-image.jpg';
const defaultKeywords = 'MBTI性格类型,兼容性分析,人格匹配,MBTI关系,INFJ兼容性,ENFP兼容性,性格测试,人际关系';

const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  canonicalUrl = 'https://mbti-compatibility.vercel.app/',
  ogImage = defaultOgImage,
  ogType = 'website',
  keywords = defaultKeywords,
  noIndex = false,
  structuredData,
}) => {
  return (
    <Helmet>
      {/* 基本元标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* 规范链接 */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* 禁止索引（如果需要） */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter卡片 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 