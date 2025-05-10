import React from 'react';
import CustomImage from '../Shared/CustomImage';
import { formatDate } from '@utils/dateFormatter';
import ClockIcon from '../Shared/ClockIcon';

const NewsCard = ({ article, onClick }) => {
  return (
    <div
      className="cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <CustomImage
          src={article.thumbnail_url || article.main_image_url}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackSrc="/placeholder.png"
        />
      </div>
      <div className="p-4">
        {(article.category_name || article.category || article.category_id != null) && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">
            {article.category_name || article.category || (article.category_id ? `Category ID: ${article.category_id}` : 'Uncategorized')}
          </span>
        )}
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

export default NewsCard;
