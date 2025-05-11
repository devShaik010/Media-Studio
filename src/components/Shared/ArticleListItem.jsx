import React from 'react';
import { Link } from 'react-router-dom';
import CustomImage from './CustomImage'; // Assuming CustomImage is in the same Shared folder
import { formatDate } from '../../utils/dateFormatter'; // Adjust path as needed
// Removed FaRegComment, FaEye as they are no longer used

const ArticleListItem = ({ article }) => {
  if (!article) return null;

  const isRTL = article.lang === 'ur' || article.lang === 'ar';
  const author = article.author_name || article.author || 'Media Focus Point'; // Default author changed
  // Removed views and comments constants as they are no longer used

  // Create a short description from content, limit to e.g., 150 characters
  const description = article.content 
    ? (article.content.length > 150 ? article.content.substring(0, 150) + '...' : article.content)
    : 'No description available.';

  return (
    <div className={`flex flex-col md:flex-row bg-white py-6 border-b border-gray-200 ${!isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} md:gap-4`}> {/* Increased py-4 to py-6 */}
      {/* Text Content Section */}
      <div className={`px-4 md:px-0 flex flex-col justify-between md:w-3/4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div>
          <h2 className={`font-bold text-gray-800 mb-2 ${isRTL ? 'font-urdu text-lg lg:text-xl' : 'text-xl lg:text-2xl'}`}> {/* Adjusted font size for RTL */}
            <Link to={`/article/${article.id}`} className="hover:text-red-700">{article.title}</Link>
          </h2>
          
          <div className={`text-xs text-gray-500 mb-3 flex items-center ${isRTL ? 'md:justify-end space-x-reverse space-x-2' : 'space-x-2'}`}>
            <span>BY {author.toUpperCase()}</span>
            <span className="text-gray-300 mx-1">|</span>
            <span>{article.publish_date ? formatDate(article.publish_date) : 'N/A'}</span>
            {/* Removed comments and views icons and counts */}
          </div>

          <p className={`text-gray-600 text-sm mb-4 leading-relaxed ${isRTL ? 'font-urdu' : ''} line-clamp-3 pb-1`}> {/* Added pb-1 for text cutoff */}
            {description}
          </p>
        </div>

        <Link 
          to={`/article/${article.id}`} 
          className={`self-start mt-auto px-3 py-1 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 ${isRTL ? 'md:self-end' : ''}`}
        >
          {isRTL ? 'مزید پڑھیں' : 'READ MORE'}
        </Link>
      </div>

      {/* Image Section */}
      {article.thumbnail_url && (
        <div className={`md:w-1/4 w-full h-36 md:h-auto mt-4 md:mt-0 self-center`}> {/* Removed specific LTR/RTL margins, gap on parent handles spacing */}
          <Link to={`/article/${article.id}`} className="block w-full h-full">
            <CustomImage
              src={article.thumbnail_url}
              alt={article.title}
              className="w-full h-full object-cover"
              fallbackSrc="/placeholder.png" // Provide a fallback image
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArticleListItem;
