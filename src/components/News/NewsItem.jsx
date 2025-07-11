import React from 'react';

const NewsItem = ({ source, headline, thumbnail }) => {

  const handleClick = () => {
    // Add navigation logic here (replace with actual navigation)
    console.log('Navigate to article:', headline);
  };

  return (
    // News item container with styling
    <article className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Thumbnail area */}
      <div className="aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      {/* Content area */}
      <div className="p-4">
        {/* Source styling */}
        <div className="text-xs text-blue-600 uppercase font-medium mb-1">{source}</div>
        {/* Headline styling */}
        <h4
          className="text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors duration-200 cursor-pointer font-sans"
          onClick={handleClick}
          role="link"
          tabIndex={0}
        >
          {headline}
        </h4>
      </div>
    </article>
  );
};

export default NewsItem;
