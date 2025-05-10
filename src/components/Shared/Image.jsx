import React from 'react';

const Image = ({ src, alt, className = '', fallbackSrc = '/placeholder.png' }) => {
  const handleError = (e) => {
    e.target.src = fallbackSrc;
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

export default Image;
