import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  sizes?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
  style?: React.CSSProperties;
}

/**
 * 优化的图片组件，支持延迟加载、图像SEO和结构化数据
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  fetchpriority = 'auto',
  style,
}) => {
  // 处理优先级
  if (priority) {
    loading = 'eager';
    fetchpriority = 'high';
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      fetchPriority={fetchpriority}
      style={style}
      // 添加结构化数据属性
      itemProp="image"
    />
  );
};

export default OptimizedImage; 