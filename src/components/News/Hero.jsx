import React from 'react';
import { Link } from 'react-router-dom';
import Image from '@components/Shared/Image';
import { useNewsData } from '../../hooks/useNewsData';

const Hero = () => {
  const { heroArticle, topStories, loading, error } = useNewsData();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <section className="w-full bg-gray-50 mt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-red-600">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (loading || !heroArticle) {
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

  return (
    <section className="w-full bg-gray-50 mt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breaking News Ticker */}
        <div className="mb-6 bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center overflow-hidden">
          <span className="font-bold text-sm mr-3 bg-white text-blue-700 px-2 py-0.5 rounded">BREAKING</span>
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-sm">
              {heroArticle.title} • {formatDate(heroArticle.publish_date)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Link 
                to={`/article/${heroArticle.id}`}
                className="group block w-full"
              >
                {/* Main Article Content */}
                <div className="relative h-[240px] sm:h-[320px] overflow-hidden">
                  <Image 
                    src={heroArticle.main_image_url || heroArticle.thumbnail_url} 
                    alt={heroArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                    {heroArticle.title}
                  </h1>
                  <p className="mt-3 text-gray-600 line-clamp-3">
                    {heroArticle.content}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(heroArticle.publish_date)}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>

          {/* Side Articles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {topStories.map((article) => (
                  <Link 
                    key={article.id} 
                    to={`/article/${article.id}`}
                    className="group block hover:bg-blue-50 transition-colors duration-200"
                  >
                    <article className="flex p-4">
                      <div className="mr-4 flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                        <Image 
                          src={article.thumbnail_url || article.main_image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(article.publish_date)}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;