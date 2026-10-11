import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  className?: string;
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'SIZANBD Gadget',
  fallbackText,
  className = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#F5F5F3] border border-[#E5E5E5] flex flex-col items-center justify-center p-3 text-center text-neutral-400 select-none ${className}`}
        aria-label={alt}
      >
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
          SIZANBD
        </span>
        <span className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 max-w-[90%]">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton Shimmer */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#EFEFEF] animate-pulse z-10"
          aria-hidden="true"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
