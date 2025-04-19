import React, { useState } from 'react';
import clsx from 'clsx';
// Removed import './Image.css';

const Image = ({ 
  src, 
  alt, 
  className,
  fallbackSrc = 'https://placehold.co/600x400?text=Image+Not+Found'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    // Image wrapper with relative positioning and background color
    <div className={clsx(
      "relative w-full h-full bg-gray-100 overflow-hidden",
      isLoading ? "animate-pulse" : "" // Conditionally apply pulse animation
    )}>
      <img
        src={imgSrc}
        alt={alt}
        className={clsx(
          className,
          "w-full h-full object-cover transition-opacity duration-300",
          hasError ? "opacity-50" : "opacity-100" // Adjust opacity on error
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      {isLoading && (
        // Loader overlay with absolute positioning and styling
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          {/* Loader spinner with Tailwind CSS classes */}
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Image;
