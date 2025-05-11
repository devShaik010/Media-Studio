import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// HomeIcon component is no longer needed

const BreakingNews = ({ newsItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  if (!newsItems || newsItems.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  useEffect(() => {
    if (newsItems.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 7000);
    }
    return () => clearInterval(intervalRef.current);
  }, [newsItems.length]);

  const currentNews = newsItems[currentIndex];
  const newsDetailPath = currentNews?.id ? `/article/${currentNews.id}` : '#';

  return (
    <div className="max-w-4xl mx-auto my-2 shadow-md flex items-stretch h-12 md:h-14" dir="ltr"> {/* Ensure overall container is LTR for ordering */}
      {/* Navigation Controls - Moved to the left */}
      {newsItems.length > 1 && (
        <div className="bg-white text-gray-600 flex items-center border-r border-gray-200 rounded-l-md">
          <button
            onClick={handlePrev}
            className="p-2 sm:p-3 hover:text-red-600 focus:outline-none" // Reduced padding on small screens
            aria-label="پچھلی خبر"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="p-2 sm:p-3 hover:text-red-600 focus:outline-none border-l border-gray-200" // Reduced padding on small screens
            aria-label="اگلی خبر"
          >
            &#10095;
          </button>
        </div>
      )}

      {/* News Content - Urdu Support */}
      <div
        dir="rtl" // Text direction is RTL
        lang="ur"
        className="bg-white text-gray-800 flex-grow flex items-center overflow-hidden px-2 sm:px-4 py-1 font-urdu" // Reduced horizontal padding on small screens
        aria-live="polite"
      >
        <Link
          to={newsDetailPath}
          className="block w-full truncate font-semibold text-xs sm:text-sm md:text-base hover:text-red-600 transition-colors duration-200 leading-normal text-right" // Adjusted text sizes
        >
          {currentNews.title}
        </Link>
      </div>

      {/* Breaking News Label - Moved to the right */}
      <div className="bg-red-600 text-white flex items-center justify-center px-2 sm:px-3 py-2 rounded-r-md text-xs sm:text-sm font-bold tracking-wide uppercase"> {/* Adjusted text sizes and padding */}
        Breaking News
      </div>
    </div>
  );
};

export default BreakingNews;
