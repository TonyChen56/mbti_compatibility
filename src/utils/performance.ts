/**
 * 性能监控工具 - 用于测量和报告关键性能指标
 */

// 性能指标类型定义
interface PerformanceMetrics {
  FCP?: number;  // First Contentful Paint
  LCP?: number;  // Largest Contentful Paint
  FID?: number;  // First Input Delay
  CLS?: number;  // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  TTI?: number;  // Time to Interactive
}

/**
 * 初始化性能监控
 */
export const initPerformanceMonitoring = (): void => {
  // 仅在浏览器环境且支持Performance API时运行
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  // 收集基本导航性能指标
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics: PerformanceMetrics = {};
      
      // 获取导航性能数据
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        metrics.TTFB = navEntry.responseStart;
      }
      
      // 获取绘制性能数据
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.FCP = fcpEntry.startTime;
      }
      
      // 记录性能指标
      logPerformanceMetrics(metrics);
    }, 0);
  });

  // 监听Largest Contentful Paint
  observeLCP();
  
  // 监听Cumulative Layout Shift
  observeCLS();
  
  // 监听First Input Delay
  observeFID();
};

/**
 * 观察Largest Contentful Paint
 */
const observeLCP = (): void => {
  if (!window.PerformanceObserver) return;
  
  try {
    // LCP需要使用PerformanceObserver API
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const metrics: PerformanceMetrics = {
          LCP: lastEntry.startTime
        };
        logPerformanceMetrics(metrics);
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.error('LCP monitoring error:', e);
  }
};

/**
 * 观察Cumulative Layout Shift
 */
const observeCLS = (): void => {
  if (!window.PerformanceObserver) return;
  
  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    
    // CLS需要使用PerformanceObserver API
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // 只有不是因为用户输入引起的布局偏移才计入CLS
        if (!(entry as any).hadRecentInput) {
          clsEntries.push(entry);
          clsValue += (entry as any).value;
        }
      });
      
      const metrics: PerformanceMetrics = {
        CLS: clsValue
      };
      logPerformanceMetrics(metrics);
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.error('CLS monitoring error:', e);
  }
};

/**
 * 观察First Input Delay
 */
const observeFID = (): void => {
  if (!window.PerformanceObserver) return;
  
  try {
    // FID需要使用PerformanceObserver API
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      
      if (firstEntry) {
        const metrics: PerformanceMetrics = {
          FID: firstEntry.processingStart - firstEntry.startTime
        };
        logPerformanceMetrics(metrics);
      }
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.error('FID monitoring error:', e);
  }
};

/**
 * 记录性能指标
 * 在实际应用中，这可以发送到分析服务
 */
const logPerformanceMetrics = (metrics: PerformanceMetrics): void => {
  // 开发环境下在控制台输出
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metrics:', metrics);
  }
  
  // 在实际应用中，您可以将指标发送到分析服务
  // sendMetricsToAnalyticsService(metrics);
};

/**
 * 检查页面性能是否在良好范围内
 */
export const checkPerformanceScores = (metrics: PerformanceMetrics): Record<string, string> => {
  const scores: Record<string, string> = {};
  
  // LCP评分标准
  if (metrics.LCP !== undefined) {
    if (metrics.LCP < 2500) {
      scores.LCP = 'good';
    } else if (metrics.LCP < 4000) {
      scores.LCP = 'needs-improvement';
    } else {
      scores.LCP = 'poor';
    }
  }
  
  // FID评分标准
  if (metrics.FID !== undefined) {
    if (metrics.FID < 100) {
      scores.FID = 'good';
    } else if (metrics.FID < 300) {
      scores.FID = 'needs-improvement';
    } else {
      scores.FID = 'poor';
    }
  }
  
  // CLS评分标准
  if (metrics.CLS !== undefined) {
    if (metrics.CLS < 0.1) {
      scores.CLS = 'good';
    } else if (metrics.CLS < 0.25) {
      scores.CLS = 'needs-improvement';
    } else {
      scores.CLS = 'poor';
    }
  }
  
  return scores;
}; 