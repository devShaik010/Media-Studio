import React from 'react';
import { Link } from 'react-router-dom';
import { useNewsData } from '../../hooks/useNewsData';

const Headlines = () => {
  const { heroArticle, topStories, loading, error } = useNewsData();

  if (loading) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              News Unavailable
            </h3>
            <p className="text-sm text-gray-500">
              New articles will be published soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!heroArticle) {
    return (
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No articles available</h3>
            <p className="mt-1 text-sm text-gray-500">
              New articles will be published soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">
          Headlines
        </h2>
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/latest"
            className="text-blue-600 flex items-center text-sm font-medium hover:text-blue-800 transition-colors"
          >
            View All
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main featured article */}
          <div className="lg:col-span-8">
            <Link
              to={`/article/${heroArticle.id}`}
              className="group block h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden">
                <img
                  src={heroArticle.main_image_url || heroArticle.thumbnail_url}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  FEATURED
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-tight mb-2">
                  {heroArticle.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base line-clamp-2">
                  {heroArticle.content}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>{formatDate(heroArticle.publish_date)}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Side stories */}
          <div className="lg:col-span-4">
            <div className="flex flex-col h-full gap-4">
              {topStories.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex"
                >
                  <div className="w-1/3 aspect-square overflow-hidden">
                    <img
                      src={article.thumbnail_url || article.main_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 w-2/3">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-snug line-clamp-3">
                      {article.title}
                    </h4>
                    <div className="mt-2 text-xs text-gray-500">
                      {formatDate(article.publish_date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ClockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default Headlines;
