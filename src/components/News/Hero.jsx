import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import Image from '@components/Shared/Image';

const Hero = () => {
  const { language, articles } = useLanguage();

  // Format date based on language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', options);
  };

  // Create article URL
  const getArticleUrl = (slug) => `/${language}/article/${slug}`;

  // Get the latest 4 articles for the hero section
  const heroArticles = articles 
    ? [...articles]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 4)
    : [];

  // Handle empty state with graceful fallback
  if (heroArticles.length === 0) {
    return (
      <section className="w-full bg-gray-50 mt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse bg-white rounded-xl shadow-sm w-full h-[350px] flex items-center justify-center">
            <p className="text-gray-400">Loading headlines...</p>
          </div>
        </div>
      </section>
    );
  }

  const [mainArticle, ...sideArticles] = heroArticles;

  return (
    <section className="w-full bg-gray-50 mt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breaking News Ticker (Optional) */}
        <div className="mb-6 bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center overflow-hidden">
          <span className="font-bold text-sm mr-3 bg-white text-blue-700 px-2 py-0.5 rounded">BREAKING</span>
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-sm">
              {mainArticle?.title} • {formatDate(mainArticle?.publishDate)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Link 
                to={getArticleUrl(mainArticle?.slug)}
                className="group block w-full"
              >
                <div className="relative h-[240px] sm:h-[320px] overflow-hidden">
                  <Image 
                    src={mainArticle?.heroImage} 
                    alt={mainArticle?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x450?text=News+Image';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-700 rounded-full shadow-sm">
                      {mainArticle?.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                    {mainArticle?.title}
                  </h1>
                  <p className="mt-3 text-gray-600 line-clamp-3">
                    {mainArticle?.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(mainArticle?.publishDate)}
                    </span>
                    <span className="text-sm font-medium text-blue-700 group-hover:underline">
                      {language === 'ur' ? 'مزید پڑھیں' : 'Read more'}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>

          {/* Side Articles Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">
                  {language === 'ur' ? 'اہم خبریں' : 'Top Stories'}
                </h2>
                <Link to={`/${language}/latest`} className="text-sm font-medium text-blue-700 hover:underline">
                  {language === 'ur' ? 'سب دیکھیں' : 'View all'}
                </Link>
              </div>

              {/* Side Articles */}
              <div className="divide-y divide-gray-100">
                {sideArticles.map((article, index) => (
                  <Link 
                    key={article.id} 
                    to={getArticleUrl(article.slug)}
                    className="group block hover:bg-blue-50 transition-colors duration-200"
                  >
                    <article className="flex p-4">
                      <div className="mr-4 flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                        <Image 
                          src={article.thumbnail} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/120x90?text=News';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-blue-700">
                          {article.category}
                        </span>
                        <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(article.publishDate)}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Trending Topics */}
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {language === 'ur' ? 'ٹاپ ٹیگز' : 'Trending Topics'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Politics', 'Business', 'Health', 'Technology', 'Sports'].map(tag => (
                    <Link 
                      key={tag} 
                      to={`/${language}/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;