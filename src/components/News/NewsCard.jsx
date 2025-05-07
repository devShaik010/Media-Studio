import React from 'react';
import Image from '@components/Shared/Image';

const NewsCard = ({ article, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={article.thumbnail_url || article.main_image_url}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h4 className="text-md font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug mb-2">
          {article.title}
        </h4>
        <div className="flex items-center text-xs text-gray-500">
          <ClockIcon className="w-3 h-3 mr-1" />
          <span>{formatDate(article.publish_date)}</span>
        </div>
      </div>
    </div>
  );
};

const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default NewsCard;
