import React, { useState } from 'react';

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
    <div className={`image-wrapper ${isLoading ? 'loading' : ''}`}>
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${hasError ? 'error' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      {isLoading && (
        <div className="image-loader">
          <div className="loader-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Image;