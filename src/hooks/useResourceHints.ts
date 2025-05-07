import { useEffect } from 'react';

/**
 * 资源类型
 */
type ResourceType = 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';

/**
 * 资源提示配置接口
 */
interface ResourceHint {
  href: string;
  type: ResourceType;
  as?: string;
  crossOrigin?: string;
  media?: string;
}

/**
 * 清理已加载的资源提示
 * @param hints 要清理的资源提示数组
 */
const cleanupResourceHints = (hints: ResourceHint[]): void => {
  hints.forEach(hint => {
    const selector = `link[href="${hint.href}"][rel="${hint.type}"]`;
    const existingLink = document.querySelector(selector);
    if (existingLink) {
      document.head.removeChild(existingLink);
    }
  });
};

/**
 * 资源预加载Hook
 * @param hints 资源提示配置数组
 * @param cleanup 是否在组件卸载时清理资源提示
 */
const useResourceHints = (hints: ResourceHint[], cleanup: boolean = false): void => {
  useEffect(() => {
    // 只在客户端执行
    if (typeof document === 'undefined') return;

    // 添加资源提示
    hints.forEach(hint => {
      // 检查是否已存在相同的提示
      const selector = `link[href="${hint.href}"][rel="${hint.type}"]`;
      if (document.querySelector(selector)) return;

      // 创建link元素
      const linkEl = document.createElement('link');
      linkEl.rel = hint.type;
      linkEl.href = hint.href;

      // 添加可选属性
      if (hint.as) linkEl.setAttribute('as', hint.as);
      if (hint.crossOrigin) linkEl.setAttribute('crossorigin', hint.crossOrigin);
      if (hint.media) linkEl.setAttribute('media', hint.media);

      // 添加到头部
      document.head.appendChild(linkEl);
    });

    // 清理函数
    return () => {
      if (cleanup) {
        cleanupResourceHints(hints);
      }
    };
  }, [hints, cleanup]);
};

/**
 * 预连接到常用域名
 */
export const useCommonConnections = (): void => {
  const commonDomains: ResourceHint[] = [
    // Google Fonts
    { href: 'https://fonts.googleapis.com', type: 'preconnect' },
    { href: 'https://fonts.gstatic.com', type: 'preconnect', crossOrigin: 'anonymous' },
    // CDN (如果您使用的话)
    { href: 'https://cdn.jsdelivr.net', type: 'preconnect' },
    // 分析服务 (如果您使用的话)
    { href: 'https://www.google-analytics.com', type: 'preconnect' }
  ];

  useResourceHints(commonDomains);
};

/**
 * 为常见图标和字体进行DNS预解析
 */
export const useDnsPrefetch = (): void => {
  const domains: ResourceHint[] = [
    { href: 'https://fonts.googleapis.com', type: 'dns-prefetch' },
    { href: 'https://fonts.gstatic.com', type: 'dns-prefetch' },
    { href: 'https://cdn.jsdelivr.net', type: 'dns-prefetch' }
  ];

  useResourceHints(domains);
};

export default useResourceHints; 