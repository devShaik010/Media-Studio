import React from 'react';
import CustomImage from './CustomImage';

const NewsCard = ({ article, onClick }) => {
  // Extract needed properties from the article object
  const { 
    title, 
    published_at,
    image, 
    source, 
    category 
  } = article;

  // Format the timestamp
  const formattedDate = published_at ? new Date(published_at).toLocaleDateString() : null;
  
  return (
    <article 
      className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full cursor-pointer" 
      onClick={onClick}
    >
      {/* Latest News tag in Urdu - positioned at top left with red background */}
      <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-tl-lg z-10">
        تازہ ترین خبریں
      </div>
      
      {/* Thumbnail area */}
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <CustomImage
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          fallbackSrc="https://placehold.co/600x400?text=News+Image"
        />
      </div>
      
      {/* Content area */}
      <div className="p-4">
        {/* Source and category */}
        <div className="flex justify-between items-center mb-1">
          {source && <div className="text-xs text-blue-600 uppercase font-medium">{source}</div>}
          {category && <div className="text-xs bg-gray-200 rounded px-2 py-0.5">{category}</div>}
        </div>
        
        {/* Headline styling */}
        <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors duration-200 mb-2">
          {title}
        </h4>
        
        {/* Timestamp styling */}
        {formattedDate && (
          <time className="text-xs text-gray-500 block">
            {formattedDate}
          </time>
        )}
      </div>
    </article>
  );
};

export default NewsCard;