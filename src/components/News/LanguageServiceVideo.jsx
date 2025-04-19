import React from 'react';

import { useLanguage } from '@context/LanguageContext'; // Import useLanguage

const LanguageServiceVideo = ({ language: serviceLanguage }) => { // Renamed prop to avoid conflict
  const { language: currentLanguage } = useLanguage(); // Get current UI language

  // Use language-specific font for the service language text
  const textFontFamily = currentLanguage === 'ur' ? 'font-[--font-ur]' : 'font-sans';

  return (
    // Card container with styling and hover effect
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow duration-200 hover:shadow-lg">
      {/* Thumbnail placeholder area */}
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {/* Placeholder icon styling */}
        <span role="img" aria-label="video placeholder" className="text-4xl text-gray-400 group-hover:scale-110 transition-transform duration-200">
          ▶️ {/* Using a play icon instead */}
        </span>
      </div>
      {/* Language text styling */}
      <p className={`p-4 text-center font-semibold text-gray-700 ${textFontFamily} ${currentLanguage === 'ur' ? 'text-lg' : 'text-base'}`}>
        {serviceLanguage}
      </p>
    </div>
  );
};

export default LanguageServiceVideo;
