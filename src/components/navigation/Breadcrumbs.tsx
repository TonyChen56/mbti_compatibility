import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BreadcrumbItem {
  path: string;
  label: string;
  isLast: boolean;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
}

/**
 * 面包屑导航组件，支持结构化数据标记
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customItems }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  // 生成面包屑项
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    // 如果有自定义项，直接使用
    if (customItems) return customItems;
    
    const pathnames = location.pathname.split('/').filter(x => x);
    let breadcrumbs: BreadcrumbItem[] = [];
    
    // 首页始终是第一项
    breadcrumbs.push({
      path: '/',
      label: t('home', 'navigation'),
      isLast: pathnames.length === 0
    });
    
    // 添加其他路径
    let currentPath = '';
    pathnames.forEach((value, index) => {
      currentPath += `/${value}`;
      const isLast = index === pathnames.length - 1;
      
      // 根据路径确定标签
      let label = '';
      switch (value) {
        case 'about':
          label = t('about', 'navigation');
          break;
        case 'compatibility':
          label = t('compatibility', 'navigation');
          break;
        default:
          // 如果是MBTI类型，直接使用原值
          if (value.length === 4 && value.toUpperCase() === value) {
            label = value;
          } else {
            label = value.charAt(0).toUpperCase() + value.slice(1);
          }
      }
      
      breadcrumbs.push({
        path: currentPath,
        label,
        isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // 生成结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://mbti-compatibility.vercel.app${item.path}`,
        'name': item.label
      }
    }))
  };
  
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ol className="flex items-center space-x-1 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-1" aria-hidden="true" />
            )}
            
            {item.isLast ? (
              <span className="text-gray-500" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path} 
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 