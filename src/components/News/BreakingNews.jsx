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
    <div className="max-w-4xl mx-auto my-2 shadow-md flex items-stretch h-12">
      {/* Breaking News Label */}
      <div className="bg-red-600 text-white flex items-center justify-center px-4 py-2 rounded-l-md font-semibold">
        Breaking News
      </div>

      {/* News Content - Urdu Support */}
      <div
        dir="rtl"
        lang="ur"
        className="bg-white text-gray-800 flex-grow flex items-center overflow-hidden px-4 py-1 font-urdu" // Adjusted padding
        aria-live="polite"
      >
        <Link
          to={newsDetailPath}
          className="block w-full truncate font-semibold text-base hover:text-red-600 transition-colors duration-200 leading-normal"
        >
          {currentNews.title}
        </Link>
      </div>

      {/* Navigation Controls */}
      {newsItems.length > 1 && (
        <div className="bg-white text-gray-600 flex items-center border-l border-gray-200 rounded-r-md">
          <button
            onClick={handlePrev}
            className="p-3 hover:text-red-600 focus:outline-none"
            aria-label="پچھلی خبر"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="p-3 hover:text-red-600 focus:outline-none border-l border-gray-200"
            aria-label="اگلی خبر"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default BreakingNews;
