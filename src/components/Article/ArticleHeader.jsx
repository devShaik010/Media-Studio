import React from 'react';

const ArticleHeader = ({ imageUrl, title }) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"></div>
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-center sm:text-left">{title}</h1>
    </div>
  );
};

export default ArticleHeader;