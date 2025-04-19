import React from 'react';
import LanguageServiceVideo from './LanguageServiceVideo';

import { useLanguage } from '@context/LanguageContext'; // Import useLanguage

const LanguageServices = () => {
  const { language } = useLanguage(); // Get current language
  const languages = ['DEEWA', 'BAMBARA', 'PORTUGUESE']; // Example languages

  // Use language-specific font
  const textFontFamily = language === 'ur' ? 'font-[--font-ur]' : 'font-sans';

  return (
    // Container styling with padding and background
    <div className={`py-12 bg-gray-100 ${textFontFamily}`}> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section title styling */}
        <h3 className={`text-3xl font-bold mb-8 text-gray-900 ${language === 'ur' ? 'text-4xl' : ''}`}> 
          {language === 'ur' ? 'وی او اے کی زبان کی خدمات سے' : "From VOA's Language Services"}
        </h3>
        {/* Grid layout for videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> 
          {languages.map((lang, index) => (
            // Pass language prop to child component
            <LanguageServiceVideo key={index} language={lang} /> 
          ))}
        </div>
        {/* Summary text styling */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed"> 
          {language === 'ur' 
            ? 'گزشتہ 24 گھنٹوں میں 48 زبان کی خدمات کے ذریعہ شامل کیا گیا' 
            : 'added by 48 language services in the last 24 hours'}
          <br />
          <span className="font-semibold text-gray-700">
            {language === 'ur' ? '54 ویڈیوز | 33.1 گھنٹے کی ویڈیو | 0 مضامین' : '54 VIDEOS | 33.1 HOURS OF VIDEO | 0 ARTICLES'}
          </span>
        </p>
        {/* Button styling */}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"> 
          {language === 'ur' ? 'وی او اے گلوبل پر مزید دیکھیں' : 'View More at VOA Global'}
        </button>
      </div>
    </div> // Added missing closing div tag here
  );
};

export default LanguageServices;
