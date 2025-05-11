import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import NewsCard from '../components/News/NewsCard';
import NewsCarousel from '../components/News/NewsCarousel';

const Home = () => {
  const navigate = useNavigate();
  const { articles, loading, error } = useArticles();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Left column skeleton */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={`left-${i}`} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          {/* Center carousel skeleton */}
          <div className="md:col-span-3">
            <div className="aspect-[16/9] bg-gray-200 rounded-lg"></div>
            <div className="mt-4 flex justify-center space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={`thumb-${i}`} className="w-16 h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          {/* Right column skeleton */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={`right-${i}`} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>No articles available.</p>
      </div>
    );
  }

  // Split articles for different sections
  const leftColumnArticles = articles.slice(0, 3);
  const carouselArticles = articles.slice(3, 8); // 5 articles for carousel
  const rightColumnArticles = articles.slice(8, 11);

  return (
    <div className="container mx-auto px-2 py-4"> 
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4"> 
        {/* Left column */}
        <div className="md:col-span-2 space-y-4"> 
          {leftColumnArticles.map((article) => (
            <div key={article.id} className="h-48"> 
              <NewsCard
                article={article}
                onClick={() => navigate(`/article/${article.id}`)}
              />
            </div>
          ))}
        </div>
        
        {/* Center carousel */}
        <div className="md:col-span-3">
          <div className="aspect-[16/9]"> {/* Standardized ratio */}
            <NewsCarousel articles={carouselArticles} />
          </div>
        </div>
        
        {/* Right column */}
        <div className="md:col-span-2 space-y-4"> 
          {rightColumnArticles.map((article) => (
            <div key={article.id} className="h-48"> 
              <NewsCard
                article={article}
                onClick={() => navigate(`/article/${article.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;