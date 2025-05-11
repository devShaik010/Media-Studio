import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import NewsCard from '../components/News/NewsCard'; // Restored import
import NewsCarousel from '../components/News/NewsCarousel'; // Restored import
import BreakingNews from '../components/News/BreakingNews';
import ArticleListItem from '../components/Shared/ArticleListItem';

const Home = () => {
  const navigate = useNavigate();
  const { articles, loading, error } = useArticles();

  const sortedArticles = articles && articles.length > 0 
    ? [...articles].sort((a, b) => new Date(b.published_at) - new Date(a.published_at)) 
    : [];
  
  const breakingNewsItems = sortedArticles.slice(0, 5); 
  const leftColumnArticles = sortedArticles.slice(0, 3); 
  const carouselArticles = sortedArticles.slice(3, 8); 
  const rightColumnArticles = sortedArticles.slice(8, 11);
  // The 'moreArticles' slice is no longer needed for this section as it will show all articles.

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Left column skeleton */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={`left-skel-${i}`} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          {/* Center carousel skeleton */}
          <div className="md:col-span-3">
            <div className="aspect-[16/9] bg-gray-200 rounded-lg"></div>
            <div className="mt-4 flex justify-center space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={`thumb-skel-${i}`} className="w-16 h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          {/* Right column skeleton */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={`right-skel-${i}`} className="h-48 bg-gray-200 rounded-lg"></div>
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
    // This check should ideally happen after loading is false and error is null
    // If loading is true, it's too early to say "No articles available."
    // If error is true, the error message is already shown.
    // So, this condition is primarily for when loading is false, no error, but articles array is empty.
    if (!loading && !error) {
      // console.log("Rendering: No articles available message"); // Removed log
    }
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>No articles available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-4">
      {/* Breaking News Carousel at the top */}
      {breakingNewsItems.length > 0 && <BreakingNews newsItems={breakingNewsItems} />}

      {/* Carousel for mobile, shown above the 3-column layout */}
      <div className="md:hidden mt-4">
        <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-red-500 font-english">Featured News</h3>
        <div className="aspect-[16/9]">
          <NewsCarousel articles={carouselArticles} />
        </div>
      </div>

      {/* Original 3-Column Layout - Carousel hidden on mobile here */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
        {/* Left column */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-red-500 font-english">Top Stories</h3>
          {leftColumnArticles.map((article) => (
            <div key={`left-col-${article.id}`} className="h-48">
              <NewsCard
                article={article}
                onClick={() => navigate(`/article/${article.id}`)}
              />
            </div>
          ))}
        </div>

        {/* Center carousel - hidden on mobile, visible on md and up */}
        <div className="hidden md:block md:col-span-3">
          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-red-500 font-english">Featured News</h3>
          <div className="aspect-[16/9]">
            <NewsCarousel articles={carouselArticles} />
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-red-500 font-english">More News</h3>
          {rightColumnArticles.map((article) => (
            <div key={`right-col-${article.id}`} className="h-48">
              <NewsCard
                article={article}
                onClick={() => navigate(`/article/${article.id}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* New Article List Section - Updated Layout */}
      <div className="mt-8 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-red-600 flex justify-between items-center">
          <span className="font-english">Latest News</span>
        </h2>
        {sortedArticles.length > 0 ? (
          <>
            {(() => {
              const listCount = 4; // Number of articles to show in list style
              const listArticles = sortedArticles.slice(0, listCount);
              const gridArticles = sortedArticles.slice(listCount);

              return (
                <>
                  {/* Articles in List Style */}
                  {listArticles.length > 0 && (
                    <div className="space-y-0 mb-8">
                      {listArticles.map((article) => (
                        <ArticleListItem key={`list-item-${article.id}`} article={article} />
                      ))}
                    </div>
                  )}

                  {/* Articles in Grid Style */}
                  {gridArticles.length > 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8 pt-4 border-t font-english">
                        More From Latest News
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {gridArticles.map((article) => (
                          <NewsCard
                            key={`grid-item-${article.id}`}
                            article={article}
                            onClick={() => navigate(`/article/${article.id}`)}
                            cardStyle="new" // Use the new card style
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </>
        ) : (
          <p className="text-center text-gray-500 py-4">
            No articles to display in this section.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
