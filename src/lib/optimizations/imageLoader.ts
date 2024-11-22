import { useState, useEffect } from 'react';

interface ImageLoaderOptions {
  quality?: number;
  width?: number;
  blur?: boolean;
}

export function getOptimizedImageUrl(url: string, options: ImageLoaderOptions = {}) {
  const { quality = 75, width, blur } = options;
  const params = new URLSearchParams();

  if (quality) params.append('q', quality.toString());
  if (width) params.append('w', width.toString());
  if (blur) params.append('blur', '50');

  return `${url}?${params.toString()}`;
}

export function useProgressiveImage(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(
    getOptimizedImageUrl(src, { width: 20, blur: true })
  );

  useEffect(() => {
    const highResImage = new Image();
    highResImage.src = getOptimizedImageUrl(src, { quality: 90 });
    
    highResImage.onload = () => {
      setCurrentSrc(highResImage.src);
      setIsLoading(false);
    };
  }, [src]);

  return { currentSrc, isLoading };
}

export function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new Image();
    img.src = getOptimizedImageUrl(url);
  });
}

export function lazyLoadImage(element: HTMLImageElement) {
  if ('loading' in HTMLImageElement.prototype) {
    element.loading = 'lazy';
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          observer.unobserve(img);
        }
      });
    });
    observer.observe(element);
  }
}