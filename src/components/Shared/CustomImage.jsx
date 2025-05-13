import React, { useState, useEffect } from 'react';

// Default fallback image for all components using CustomImage
const DEFAULT_FALLBACK = '/breakingNews.png';

const CustomImage = ({ src, alt, className = '', fallbackSrc = DEFAULT_FALLBACK }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  
  // Update image source if src prop changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
    }
  }, [src]);
  
  const handleError = () => {
    // If the current source is already the fallback, don't try to set it again
    // This prevents potential infinite loops if the fallback itself fails
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Image'}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default CustomImage;
