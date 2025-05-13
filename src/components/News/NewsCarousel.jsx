import React, { useState, useEffect } from 'react';
import CustomImage from '../Shared/CustomImage';
import { Link } from 'react-router-dom';
import ClockIcon from '../Shared/ClockIcon';
import { formatDate } from '../../utils/dateFormatter';
import { generateSlug } from '../../services/articlesService';

// Default image path for when no image is available
const DEFAULT_IMAGE = '/breakingNews.png';

// Basic Carousel Item (styled similarly to NewsCard)
const CarouselItem = ({ article, isActive }) => {
  if (!article) return null;
  const views = article.views || 0;
  
  // Generate article URL with slug for better SEO and readability
  const articleUrl = `/article/${article.slug || `${article.id}-${generateSlug(article.title)}`}`;
  
  // Use a specific field for image if available, otherwise use default image
  const imageUrl = article.main_image_url || article.thumbnail_url || DEFAULT_IMAGE;

  return (
    <div className={`w-full h-full flex-shrink-0 ${isActive ? 'block' : 'hidden'}`}>
      <Link to={articleUrl} className="block group relative shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full">
        <div className="absolute inset-0">
          <CustomImage
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300"
            fallbackSrc={DEFAULT_IMAGE}
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
          <div>
            <h3 className={`text-lg md:text-xl font-bold leading-tight mb-1 group-hover:text-gray-200 transition-colors duration-200 ${article.lang === 'ur' ? 'text-urdu' : ''}`}>
              {article.title}
            </h3>
            <div className="flex items-center justify-end text-xs text-gray-200 space-x-3">
              {/* Time and views removed as per request */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const NewsCarousel = ({ articles = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!articles || articles.length === 0) {
    return <div className="text-center p-4 h-full bg-gray-100 flex items-center justify-center">No articles for carousel.</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  // Auto-play functionality
  useEffect(() => {
    if (articles.length > 1) {
      const timer = setTimeout(() => {
        handleNext();
      }, 5000); // Change slide every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentIndex, articles.length]);

  return (
    <div className="relative w-full h-full overflow-hidden"> 
      <div className="overflow-hidden relative h-full">
        {articles.map((article, index) => (
          <CarouselItem key={article.id || index} article={article} isActive={index === currentIndex} />
        ))}
      </div>

      {/* Navigation Arrows */}
      {articles.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-150 z-20"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-150 z-20"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
      
      {/* Dots Indicator - Hidden on small screens (sm and below), visible on md and up */}
      {articles.length > 1 && (
        <div className="hidden md:flex absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-2 z-20">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400/60 hover:bg-gray-300/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* Active Article Title Display - Hidden on small screens (sm and below), visible on md and up */}
      {articles.length > 0 && articles[currentIndex] && (
        <div className="hidden md:flex mt-1 p-4 text-center bg-gray-50 dark:bg-gray-700 rounded-b-md shadow flex-col justify-center min-h-[10rem]">
          <div> {/* Inner div for content grouping to allow flex centering */}
            {(articles[currentIndex].category_name || articles[currentIndex].category || articles[currentIndex].category_id != null) && (
              <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-0.5 mb-2 rounded-sm">
                {articles[currentIndex].category_name || articles[currentIndex].category || (articles[currentIndex].category_id ? `Category ID: ${articles[currentIndex].category_id}` : 'تازہ ترین خبریں')}
              </span>
            )}
            <h4 className={`text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 ${articles[currentIndex].lang === 'ur' ? 'font-urdu text-2xl' : 'font-english'}`}>
              {articles[currentIndex].title}
            </h4>
            {articles[currentIndex].content && (
              <p className={`text-sm text-gray-700 dark:text-gray-300 mt-1 mb-4 ${articles[currentIndex].lang === 'ur' ? 'font-urdu text-base' : 'font-english'} leading-relaxed max-h-36 overflow-hidden text-ellipsis`}>
                {articles[currentIndex].content.substring(0, 250)}{articles[currentIndex].content.length > 250 ? '...' : ''}
              </p>
            )}
            {articles[currentIndex].published_at && (
              <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>{formatDate(articles[currentIndex].published_at)}</span>
              </div>
            )}
          </div> {/* Closing the inner div */}
        </div>
      )}

      {/* Thumbnail Previews - Hidden on small screens (sm and below), visible on md and up */}
      {articles.length > 1 && (
        <div className="hidden md:flex mt-4 justify-center space-x-2">
          {(() => {
            // Get up to 4 thumbnails, excluding the current article
            const previewArticles = articles
              .filter((_, idx) => idx !== currentIndex)
              .slice(0, 4);
            
            return previewArticles.map((previewArticle, previewIndex) => (
              <button
                key={`thumb-${previewArticle.id || previewIndex}`}
                onClick={() => {
                  // Find the original index of this previewArticle
                  const originalIndex = articles.findIndex(a => 
                    a.id === previewArticle.id
                  );
                  if (originalIndex !== -1) {
                    setCurrentIndex(originalIndex);
                  }
                }}
                className="w-16 h-10 md:w-20 md:h-12 overflow-hidden border-2 border-transparent hover:border-red-500 focus:border-red-500 transition-all duration-200 rounded"
                aria-label={`Go to slide with title ${previewArticle.title}`}
              >
                <CustomImage
                  src={previewArticle.thumbnail_url || previewArticle.main_image_url || DEFAULT_IMAGE}
                  alt={`Preview of ${previewArticle.title}`}
                  className="w-full h-full object-cover"
                  fallbackSrc={DEFAULT_IMAGE}
                />
              </button>
            ));
          })()}
        </div>
      )}
    </div>
  );
};

export default NewsCarousel;
