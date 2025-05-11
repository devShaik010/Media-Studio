import React from 'react';
import { Link } from 'react-router-dom';
import CustomImage from '../Shared/CustomImage';
import ClockIcon from '../Shared/ClockIcon';
import { formatDate } from '../../utils/dateFormatter';

const NewsCard = ({ article, onClick }) => {
  if (!article) return null;
  
  const views = article.views || 0;
  const isRTL = article.lang === 'ur' || article.lang === 'ar';
  
  return (
    <div className="h-full w-full">
      <Link 
        to={`/article/${article.id}`} 
        onClick={onClick}
        className="block h-full group relative shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      >
        <div className="absolute inset-0">
          <CustomImage
            src={article.thumbnail_url || article.main_image_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300"
            fallbackSrc="/placeholder.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between h-full p-4 text-white">
          <div>
            {(article.category_name || article.category || article.category_id != null) && (
              <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 mb-1">
                {article.category_name || article.category || (article.category_id ? `Category ID: ${article.category_id}` : 'تازہ ترین خبریں')}
              </span>
            )}
          </div>
          
          <div dir={isRTL ? "rtl" : "ltr"}>
            <h3 className={`text-sm md:text-base font-extrabold leading-tight mb-1 line-clamp-3 group-hover:text-gray-200 transition-colors duration-200 ${isRTL ? 'text-urdu' : ''}`}>
              {article.title}
            </h3>
            
            <div className={`flex items-center text-xs text-gray-200 space-x-3 ${isRTL ? 'justify-start space-x-reverse' : 'justify-end'}`}>
              {/* Time and views removed as per request */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
