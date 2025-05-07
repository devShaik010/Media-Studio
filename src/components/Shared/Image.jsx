import React from 'react';

const Image = ({ src, alt, className, fallback = '', ...props }) => {
  const handleError = (e) => {
    e.target.src = fallback;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
