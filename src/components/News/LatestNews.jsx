import React, { useState } from 'react';

const LatestNews = () => {
  // Mock language and articles data since we don't have access to context
  const [language, setLanguage] = useState('en');
  
  // Mock articles data
  const mockArticles = [
    {
      id: 1,
      slug: "global-climate-summit",
      title: "Global Climate Summit Reaches Historic Agreement on Emissions",
      category: "Environment",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      heroImage: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506",
      publishDate: "2025-03-15",
      source: "World News",
      content: [
        { text: "World leaders have finalized a landmark deal to reduce carbon emissions by 50% before 2030, setting ambitious targets for sustainable development. The agreement comes after two weeks of intense negotiations." },
        { text: "This historic pact represents the strongest commitment yet to addressing climate change and includes financial provisions to help developing nations transition to renewable energy sources." }
      ]
    },
    {
      id: 2,
      slug: "tech-innovation-award",
      title: "New AI Technology Revolutionizes Healthcare Diagnostics",
      category: "Technology",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      heroImage: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506",
      publishDate: "2025-03-10",
      source: "Tech Today",
      content: [
        { text: "A breakthrough AI system has demonstrated unprecedented accuracy in diagnosing complex medical conditions from standard imaging data, potentially saving millions of lives worldwide." }
      ]
    },
    {
      id: 3,
      slug: "economic-recovery",
      title: "Markets Rally as Economic Recovery Exceeds Expectations",
      category: "Business",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      heroImage: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506",
      publishDate: "2025-03-12",
      source: "Financial Times",
      content: [
        { text: "Global markets have surged as new data shows stronger than expected economic growth across major economies, signaling the end of recent recessionary concerns." }
      ]
    },
    {
      id: 4,
      slug: "space-exploration",
      title: "Private Space Mission Successfully Returns with Lunar Samples",
      category: "Science",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      heroImage: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506",
      publishDate: "2025-03-05",
      source: "Space News",
      content: [
        { text: "A private aerospace company has made history by returning with the largest collection of lunar samples since the Apollo missions, opening new possibilities for scientific research and space resource utilization." }
      ]
    },
    {
      id: 5,
      slug: "renewable-energy",
      title: "Breakthrough in Solar Panel Efficiency Cuts Costs in Half",
      category: "Technology",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      heroImage: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506",
      publishDate: "2025-03-08",
      source: "Green Tech",
      content: [
        { text: "Scientists have developed a new solar cell technology that doubles efficiency while halving production costs, potentially making solar power the cheapest energy source globally." }
      ]
    },
    {
      id: 6,
      slug: "healthcare-policy",
      title: "New Healthcare Initiative to Expand Coverage for Millions",
      category: "Politics",
      thumbnail: "https://media.cnn.com/api/v1/images/stellar/prod/20250415-hghghghg.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
      heroImage: "https://www.eurasiantimes.com/wp-content/uploads/2025/04/India-Sri-Lanka.jpeg?resize=696,506",
      publishDate: "2025-03-01",
      source: "Policy Watch",
      content: [
        { text: "A comprehensive healthcare reform package has been introduced that aims to provide affordable medical coverage to an additional 30 million citizens." }
      ]
    }
  ];
  
  const articles = mockArticles;
  
  // State for selected article detail view
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Language specific styling
  const textFontFamily = language === 'ur' ? 'font-[--font-ur]' : 'font-sans';
  const isRTL = language === 'ur';
  const dirAttr = isRTL ? 'rtl' : 'ltr';
  
  // Toggle language for demo purposes
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };
  
  // Get main featured article and secondary articles
  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  // Format date based on language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'ur' ? 'ur-PK' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and language toggle */}
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold text-gray-900 ${textFontFamily}`}>
            {language === 'ur' ? 'تازہ ترین خبریں' : 'Latest News'}
          </h2>
          <button 
            onClick={toggleLanguage} 
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            {language === 'ur' ? 'English' : 'اردو'}
          </button>
        </div>
        
        {/* Conditional rendering: Article detail or News layout */}
        {selectedArticle ? (
          // Article detail view
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex">
            <div className="md:w-1/2">
              <img
                src={selectedArticle.heroImage}
                alt={selectedArticle.title}
                className="w-full h-auto object-cover md:h-full"
              />
            </div>
            <div className="p-6 md:w-1/2" dir={dirAttr}>
              {/* Article header */}
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  {selectedArticle.category}
                </span>
                <h3 className={`text-2xl font-semibold text-gray-900 mt-2 ${textFontFamily} ${isRTL ? 'text-right' : ''}`}>
                  {selectedArticle.title}
                </h3>
                <span className="text-gray-600 text-sm">
                  {formatDate(selectedArticle.publishDate)}
                </span>
              </div>
              {/* Article content */}
              <div className={`text-gray-700 leading-relaxed ${textFontFamily} ${isRTL ? 'text-right' : ''}`}>
                {selectedArticle.content.map((block, index) => (
                  <p key={index} className="mb-4">{block.text}</p>
                ))}
              </div>
              {/* Back button */}
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setSelectedArticle(null)}
              >
                {language === 'ur' ? 'واپس جائیں' : 'Back to News'}
              </button>
            </div>
          </div>
        ) : (
          // Redesigned news layout with main feature + 3 important stories
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
              {/* Main featured article - 8/12 columns on large screens */}
              <div className="lg:col-span-8">
                <div 
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full"
                  onClick={() => setSelectedArticle(mainArticle)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={mainArticle.heroImage}
                      alt={mainArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4" dir={dirAttr}>
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                        {mainArticle.category}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-bold text-white ${textFontFamily} ${isRTL ? 'text-right' : ''}`}>
                        {mainArticle.title}
                      </h3>
                      <div className="flex items-center mt-2">
                        <ClockIcon className="w-4 h-4 text-gray-200" />
                        <span className="ml-1 text-gray-200 text-sm">
                          {formatDate(mainArticle.publishDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 3 important stories sidebar - 4/12 columns on large screens */}
              <div className="lg:col-span-4">
                <div className="flex flex-col h-full">
                  {secondaryArticles.map((article, index) => (
                    <div 
                      key={article.id}
                      className={`cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex ${index < secondaryArticles.length - 1 ? 'mb-4' : ''}`}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="w-1/3 aspect-square overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className={`p-3 w-2/3 ${textFontFamily}`} dir={dirAttr}>
                        <div className="text-xs text-blue-600 font-medium mb-1">{article.category}</div>
                        <h4 className={`text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug mb-1 line-clamp-2 ${isRTL ? 'text-right' : ''}`}>
                          {article.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          
            {/* Additional news grid */}
            {remainingArticles.length > 0 && (
              <>
                <div className="flex items-center mt-8 mb-6">
                  <BookmarkIcon className="w-5 h-5 mr-2 text-gray-700" />
                  <h3 className={`text-xl font-semibold text-gray-800 ${textFontFamily}`}>
                    {language === 'ur' ? 'مزید خبریں' : 'More News'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      category={article.category}
                      headline={article.title}
                      timestamp={formatDate(article.publishDate)}
                      thumbnail={article.thumbnail}
                      onClick={() => setSelectedArticle(article)}
                      language={language}
                      textFontFamily={textFontFamily}
                      isRTL={isRTL}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// NewsCard component
const NewsCard = ({ category, headline, timestamp, thumbnail, onClick, language, textFontFamily, isRTL }) => {
  return (
    <div 
      className="cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={headline}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className={`p-4 ${textFontFamily}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">{category}</div>
        <h4 className={`text-md font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug mb-2 ${isRTL ? 'text-right' : ''}`}>
          {headline}
        </h4>
        <div className="flex items-center text-xs text-gray-500">
          <ClockIcon className="w-3 h-3 mr-1" />
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

// Custom SVG icons
const ClockIcon = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
};

const BookmarkIcon = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default LatestNews;