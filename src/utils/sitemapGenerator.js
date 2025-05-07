const fs = require('fs');
const path = require('path');

// MBTI类型列表
const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

// 基础URL
const BASE_URL = 'https://mbti-compatibility.vercel.app';

// 静态页面列表
const staticPages = [
  '',  // 首页
  '/about'
];

// 生成所有可能的兼容性页面URL
const generateCompatibilityUrls = () => {
  const urls = [];
  
  mbtiTypes.forEach(type1 => {
    mbtiTypes.forEach(type2 => {
      if (type1 !== type2) {  // 避免相同类型的组合
        urls.push(`/compatibility/${type1}/${type2}`);
      }
    });
  });
  
  return urls;
};

// 生成XML内容
const generateSitemapXml = () => {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // 添加静态页面
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
  });
  
  // 添加兼容性页面，它们的优先级稍低
  const compatibilityUrls = generateCompatibilityUrls();
  compatibilityUrls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
};

// 创建公共目录（如果不存在）
const publicDir = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 写入sitemap.xml文件
const generateSitemap = () => {
  const xml = generateSitemapXml();
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Sitemap generated at ${sitemapPath}`);
};

// 执行生成
generateSitemap(); 