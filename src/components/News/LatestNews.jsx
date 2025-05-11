import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewsData } from '../../hooks/useNewsData';
import NewsCard from './NewsCard';

const LatestNews = () => {
  const {
    heroArticle,
    topStories,
    latestNews,
    moreStories,
    loading,
    error
  } = useNewsData();

  const navigate = useNavigate();

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-32"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !latestNews?.length) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm p-8 text-center">
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">
              Our editors are working on bringing you the latest news.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h2>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {latestNews.map(article => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={() => handleArticleClick(article.id)}
            />
          ))}
        </div>

        {/* More Stories */}
        {moreStories.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              More Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreStories.map(article => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={() => handleArticleClick(article.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
