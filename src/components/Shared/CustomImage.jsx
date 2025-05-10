import React from 'react';

const CustomImage = ({ src, alt, className = '', fallbackSrc = '/vite.svg' }) => { // Changed default fallbackSrc
  const handleError = (e) => {
    // To prevent infinite loop if fallbackSrc also fails
    if (e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default CustomImage;
