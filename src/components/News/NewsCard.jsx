import React from 'react';
import Image from '@components/Shared/Image';

const NewsCard = ({ category, headline, timestamp, thumbnail, onClick }) => {
  return (
    <article onClick={onClick} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={thumbnail}
          alt={headline}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="inline-block px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-2">
          {category}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {headline}
        </h3>
        <time className="text-sm text-gray-500">
          {timestamp}
        </time>
      </div>
    </article>
  );
};

export default NewsCard;
