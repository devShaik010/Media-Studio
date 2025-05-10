import React from 'react';
  import { useNavigate, Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import NewsCard from '../components/News/NewsCard'; // Existing NewsCard
import CustomImage from '../components/Shared/CustomImage'; // Import CustomImage

// A more prominent card for the main featured article
const FeaturedHeroCard = ({ article, onClick }) => {
  if (!article) return null;
  return (
    <div
      className="cursor-pointer group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden col-span-1 md:col-span-2 lg:col-span-2" // Spans more columns
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-200"> {/* Added bg-gray-200 for placeholder aspect ratio */}
        <CustomImage
          src={article.main_image_url || article.thumbnail_url}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackSrc="/placeholder.png" // Ensure CustomImage has a fallback
        />
      </div>
      <div className="p-6">
        {(article.category_name || article.category || article.category_id != null) && (
          <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-2 uppercase">
            {article.category_name || article.category || (article.category_id ? `Category ID: ${article.category_id}` : 'Uncategorized')}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-red-700 transition-colors duration-200 leading-tight mb-3">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.summary || article.content?.substring(0,150)}...</p>
        <div className="text-xs text-gray-500">
          {new Date(article.publish_date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};


const Home = () => {
  const navigate = useNavigate();
  const { articles, loading, error } = useArticles();

  // Prepare data for different sections
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  // Log the featured article for debugging
  if (featuredArticle) {
    console.log("Featured Article Data:", JSON.stringify(featuredArticle, null, 2));
  }

  if (loading) {
    // Simple full page loader for now
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><p>Loading news...</p></div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center"><p className="text-red-600">Error: {error}</p></div>;
  }

  const secondaryFeaturedArticles = articles.slice(1, 4); // Next 3 articles
  const remainingArticles = articles.slice(4);

  // Group remaining articles by category
  const articlesByCategory = remainingArticles.reduce((acc, article) => {
    const categoryDisplay = article.category_name || article.category || (article.category_id ? `Category ID: ${article.category_id}` : 'Uncategorized');
    if (!acc[categoryDisplay]) {
      acc[categoryDisplay] = [];
    }
    acc[categoryDisplay].push(article);
    return acc;
  }, {});

  const sidebarArticles = articles.slice(0, 5); // Latest 5 articles for sidebar

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="lg:w-2/3">
          {/* Hero Section */}
          {featuredArticle && (
            <section className="mb-8">
              <FeaturedHeroCard
                article={featuredArticle}
                onClick={() => navigate(`/article/${featuredArticle.id}`)}
              />
            </section>
          )}

          {/* Secondary Featured Section - Row of smaller cards */}
          {secondaryFeaturedArticles.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-red-500">More Top Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryFeaturedArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={() => navigate(`/article/${article.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Category Sections */}
          {Object.entries(articlesByCategory).map(([categoryName, categoryArticles]) => (
            <section key={categoryName} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryArticles.slice(0, 4).map((article) => ( // Show up to 4 articles per category section
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={() => navigate(`/article/${article.id}`)}
                  />
                ))}
              </div>
              {categoryArticles.length > 4 && (
                 <div className="text-right mt-4">
                    <Link to={`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
                        View all in {categoryName} &rarr;
                    </Link>
                 </div>
              )}
            </section>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              Latest News
            </h2>
            <ul className="space-y-3">
              {sidebarArticles.map((article) => (
                <li key={article.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                  <Link to={`/article/${article.id}`} className="group">
                    <h4 className="font-medium text-gray-800 group-hover:text-red-600 transition-colors text-sm">
                      {article.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(article.publish_date).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {/* Placeholder for Ads or other widgets */}
          <section className="p-4 bg-gray-100 rounded-md text-center">
            <p className="text-gray-500">Advertisement</p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Home;
