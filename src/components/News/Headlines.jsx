import React, { useState } from 'react';

const Headlines = () => {
  // Mock language and articles data since we don't have access to context
  const [language, setLanguage] = useState('en');
  
  // Mock articles data
  const mockArticles = [
    {
      id: 1,
      slug: "global-climate-summit",
      title: "Global Climate Summit Reaches Historic Agreement on Emissions",
      source: "World News",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      excerpt: "World leaders finalize landmark deal to reduce carbon emissions by 50% before 2030, setting ambitious targets for sustainable development."
    },
    {
      id: 2,
      slug: "tech-innovation-award",
      title: "New AI Technology Revolutionizes Healthcare Diagnostics",
      source: "Technology",
      thumbnail: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/Untitled-1290-x-650-px-68.png?resize=696,351"
    },
    {
      id: 3,
      slug: "economic-recovery",
      title: "Markets Rally as Economic Recovery Exceeds Expectations",
      source: "Business",
      thumbnail: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506"
    },
    {
      id: 4,
      slug: "space-exploration",
      title: "Private Space Mission Successfully Returns with Lunar Samples",
      source: "Science",
      thumbnail: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506"
    },
    {
      id: 5,
      slug: "renewable-energy",
      title: "Breakthrough in Solar Panel Efficiency Cuts Costs in Half",
      source: "Environment",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp"
    },
    {
      id: 6,
      slug: "healthcare-policy",
      title: "New Healthcare Initiative to Expand Coverage for Millions",
      source: "Politics",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp"
    },
    {
      id: 7,
      slug: "sports-championship",
      title: "Underdog Team Claims Victory in Championship Final",
      source: "Sports",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp"
    },
    {
      id: 8,
      slug: "arts-festival",
      title: "International Arts Festival Draws Record Attendance",
      source: "Culture",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp"
    }
  ];
  
  const articles = mockArticles;
  
  // Make sure we have at least 4 articles to work with
  const hasEnoughArticles = articles.length >= 4;
  
  // Get the main featured article and top 3 secondary articles
  const mainArticle = hasEnoughArticles ? articles[0] : null;
  const secondaryArticles = hasEnoughArticles ? articles.slice(1, 4) : [];
  
  // Get remaining articles for the bottom grid (up to 4 more)
  const remainingArticles = articles.slice(4, 8);
  
  // Language specific styling
  const textFontFamily = language === 'ur' ? 'font-[--font-ur]' : 'font-sans';
  const isRTL = language === 'ur';
  const dirAttr = isRTL ? 'rtl' : 'ltr';
  
  // Toggle language for demo purposes
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };
  
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title with language toggle for demo */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold text-gray-800 ${textFontFamily}`}>
            {language === 'ur' ? 'اہم خبریں' : 'Top Stories'}
          </h2>
          <div className="flex items-center">
            <button 
              onClick={toggleLanguage} 
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              {language === 'ur' ? 'English' : 'اردو'}
            </button>
            <a 
              href="#view-all" 
              className="text-blue-600 flex items-center text-sm font-medium hover:text-blue-800 transition-colors ml-4"
            >
              {language === 'ur' ? 'مزید دیکھیں' : 'View All'} 
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
        
        {hasEnoughArticles ? (
          <>
            {/* Featured article layout - responsive design */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Main featured article - takes 8/12 columns on large screens */}
              <div className="lg:col-span-8">
                <a
                  href={`#article-${mainArticle.id}`}
                  className="group block h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden">
                    <img
                      src={mainArticle.thumbnail}
                      alt={mainArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {language === 'ur' ? 'تازہ ترین' : 'FEATURED'}
                    </div>
                  </div>
                  <div className={`p-5 ${textFontFamily}`} dir={dirAttr}>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="text-blue-600 uppercase font-medium">{mainArticle.source}</span>
                      <span className="mx-2">•</span>
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>3 hours ago</span>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-tight mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {mainArticle.title}
                    </h3>
                    <p className={`text-gray-600 text-sm md:text-base line-clamp-2 ${isRTL ? 'text-right' : ''}`}>
                      {mainArticle.excerpt || 'Breaking news story with the latest developments on this important issue that impacts global policy.'}
                    </p>
                  </div>
                </a>
              </div>
              
              {/* Right sidebar with 3 important stories - takes 4/12 columns on large screens */}
              <div className="lg:col-span-4">
                <div className="flex flex-col h-full gap-4">
                  {secondaryArticles.map((article) => (
                    <a
                      href={`#article-${article.id}`}
                      key={article.id}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-row sm:flex-row h-full"
                    >
                      <div className="w-1/3 sm:w-1/3 aspect-video sm:aspect-square overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className={`p-3 w-2/3 sm:w-2/3 ${textFontFamily}`} dir={dirAttr}>
                        <div className="text-xs text-blue-600 uppercase font-medium mb-1">{article.source}</div>
                        <h4 className={`text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug line-clamp-3 ${isRTL ? 'text-right' : ''}`}>
                          {article.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Additional articles in a responsive grid */}
            {remainingArticles.length > 0 && (
              <>
                <div className="flex items-center mt-8 mb-4">
                  <TrendingUpIcon className="w-5 h-5 mr-2 text-gray-700" />
                  <h3 className={`text-xl font-semibold text-gray-800 ${textFontFamily}`}>
                    {language === 'ur' ? 'مزید خبریں' : 'More Stories'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {remainingArticles.map((article) => (
                    <a
                      href={`#article-${article.id}`}
                      key={article.id}
                      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className={`p-4 ${textFontFamily}`} dir={dirAttr}>
                        <div className="text-xs text-blue-600 uppercase font-medium mb-1">{article.source}</div>
                        <h4 className={`text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug ${isRTL ? 'text-right' : ''}`}>
                          {article.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // Fallback if not enough articles are available
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <a
                href={`#article-${article.id}`}
                key={article.id}
                className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className={`p-4 ${textFontFamily}`} dir={dirAttr}>
                  <div className="text-xs text-blue-600 uppercase font-medium mb-1">{article.source}</div>
                  <h4 className={`text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug ${isRTL ? 'text-right' : ''}`}>
                    {article.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Custom SVG icons to replace lucide-react
const ClockIcon = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
};

const TrendingUpIcon = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
};

// Custom arrow icon component
const ArrowRightIcon = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
};

export default Headlines;