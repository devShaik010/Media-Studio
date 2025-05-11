import React, { useState, useEffect } from 'react';
import CustomImage from '../Shared/CustomImage';
import { Link } from 'react-router-dom';
import ClockIcon from '../Shared/ClockIcon';
import { formatDate } from '../../utils/dateFormatter';

// Basic Carousel Item (styled similarly to NewsCard)
const CarouselItem = ({ article, isActive }) => {
  if (!article) return null;
  const views = article.views || 0;

  return (
    <div className={`w-full h-full flex-shrink-0 ${isActive ? 'block' : 'hidden'}`}>
      <Link to={`/article/${article.id}`} className="block group relative shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full">
        <div className="absolute inset-0">
          <CustomImage
            src={article.main_image_url || article.thumbnail_url}
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
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 hover:bg-black/70 z-20"
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 hover:bg-black/70 z-20"
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </>
      )}
      
      {/* Dots Indicator */}
      {articles.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 ${index === currentIndex ? 'bg-white' : 'bg-gray-400/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

      {/* Thumbnail Previews */}
      {articles.length > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
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
                className="w-16 h-10 md:w-20 md:h-12 overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-all duration-200"
                aria-label={`Go to slide with title ${previewArticle.title}`}
              >
                <CustomImage
                  src={previewArticle.thumbnail_url || previewArticle.main_image_url}
                  alt={`Preview of ${previewArticle.title}`}
                  className="w-full h-full object-cover"
                  fallbackSrc="/placeholder.png"
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
