import React from 'react';
import { Link } from 'react-router-dom';
import CustomImage from '../Shared/CustomImage';
import ClockIcon from '../Shared/ClockIcon';
import { formatDate } from '../../utils/dateFormatter';
import { generateSlug } from '../../services/articlesService';

const NewsCard = ({ article, onClick, cardStyle = "default" }) => {
  if (!article) return null;

  const views = article.views || 0;
  const isRTL = article.lang === 'ur' || article.lang === 'ar';
  const categoryText = article.category_name || article.category || (article.category_id ? `Category: ${article.category_id}` : 'تازہ ترین خبریں');
  // Use a specific field for image if available, otherwise fallback
  const imageUrl = article.image || article.thumbnail_url || article.main_image_url;
  
  // Generate article URL with slug for better SEO and readability
  const articleUrl = `/article/${article.slug || `${article.id}-${generateSlug(article.title)}`}`;

  if (cardStyle === "new") {
    // Style inspired by the user's RelatedNewsCard example
    return (
      <div className="h-full w-full group flex flex-col">
        <Link
          to={articleUrl}
          onClick={onClick}
          className="block"
        >
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <CustomImage
              src={imageUrl}
              alt={article.title}
              className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              fallbackSrc="https://placehold.co/400x300?text=Image"
            />
            {/* Category Tag - similar to "تازہ ترین خبریں" */}
            {(article.category_name || article.category || article.category_id != null) && (
                 <div className={`absolute top-2 right-2 bg-red-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded shadow ${isRTL ? 'left-2 right-auto' : 'right-2 left-auto'}`}>
                {categoryText}
              </div>
            )}
          </div>
        </Link>

        {/* Content section below image */}
        <div className={`mt-3 flex-grow flex flex-col ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
          <Link
            to={articleUrl}
            onClick={onClick}
            className="block group/title"
          >
            <h3 className={`font-bold text-base sm:text-lg leading-tight mb-2 line-clamp-3 group-hover/title:text-red-600 transition-colors duration-200 ${isRTL ? 'text-urdu' : 'text-gray-800'}`}>
              {article.title}
            </h3>
          </Link>
          
          {/* Bottom section with date and views/comments */}
          <div className={`mt-auto pt-2 flex items-center justify-between text-xs ${isRTL ? 'text-urdu-meta space-x-reverse' : 'text-gray-500 space-x-2 sm:space-x-3'}`}>
            <div className="flex items-center">
              <span className={`font-medium ${isRTL ? 'text-red-500' : 'text-red-600'}`}>{article.source_name || 'Media Focus Point'}</span>
            </div>
            
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-2 sm:space-x-3'}`}>
              <span>{formatDate(article.published_at || article.created_at)}</span>
              
              {/* Views count (using views as comments_count is not in current article structure) */}
              {views > 0 && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
                  </svg>
                  <span>{views}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card style (original overlay style)
  return (
    <div className="h-full w-full">
      <Link
        to={articleUrl}
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
                {categoryText}
              </span>
            )}
          </div>

          <div dir={isRTL ? "rtl" : "ltr"}>
            <h3 className={`text-sm md:text-base font-extrabold leading-tight mb-1 line-clamp-3 group-hover:text-gray-200 transition-colors duration-200 ${isRTL ? 'text-urdu' : ''}`}>
              {article.title}
            </h3>

            <div className={`flex items-center text-xs text-gray-200 space-x-3 ${isRTL ? 'justify-start space-x-reverse' : 'justify-end'}`}>
              {/* Time and views removed as per request for default card, but added for new style */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
