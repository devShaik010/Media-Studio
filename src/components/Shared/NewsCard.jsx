import React from 'react';
import Image from './Image';
// Removed import './NewsCard.css';

const NewsCard = ({ category, headline, timestamp, thumbnail, source }) => {
  return (
    // News card container with styling
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Thumbnail area */}
      <div className="aspect-video overflow-hidden">
        <Image 
          src={thumbnail} 
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          fallbackSrc="https://placehold.co/600x400?text=News+Image"
        />
      </div>
      {/* Content area */}
      <div className="p-4">
        {/* Source styling */}
        {source && <div className="text-xs text-blue-600 uppercase font-medium mb-1">{source}</div>}
        {/* Headline styling */}
        <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors duration-200">
          {headline}
        </h4>
        {/* Timestamp styling */}
        {timestamp && <time className="text-sm text-gray-500">{timestamp}</time>}
      </div>
    </article>
  );
};

export default NewsCard;
