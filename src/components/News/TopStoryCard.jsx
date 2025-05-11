import React from 'react';
import CustomImage from '../Shared/CustomImage';
import { formatDate } from '@utils/dateFormatter';
import ClockIcon from '../Shared/ClockIcon';

const TopStoryCard = ({ article, onClick }) => {
  if (!article) {
    return null;
  }

  return (
    <div
      className="cursor-pointer group bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden md:flex"
      onClick={onClick}
    >
      {/* Text content - order changed for flex-row-reverse on desktop */}
      <div className="p-4 md:p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          {(article.category_name || article.category || article.category_id != null) && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 mb-2 rounded">
              {article.category_name || article.category || (article.category_id ? `Category ID: ${article.category_id}` : 'Uncategorized')}
            </span>
          )}
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 hidden md:block">
            {article.excerpt || article.description || `${article.content?.substring(0, 100)}...`}
          </p>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-auto">
          <ClockIcon className="w-3 h-3 mr-1" />
          <span>{formatDate(article.publish_date)}</span>
        </div>
      </div>
      {/* Image - appears on the right on desktop */}
      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
        <CustomImage
          src={article.thumbnail_url || article.main_image_url}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          fallbackSrc="/placeholder.png"
        />
      </div>
    </div>
  );
};

export default TopStoryCard;
