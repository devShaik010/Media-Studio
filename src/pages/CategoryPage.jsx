import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchArticlesByCategory } from '../services/articlesService';
import CustomImage from '../components/Shared/CustomImage';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticlesByCategory(categoryId); // Use service function
        console.log('Fetched articles data:', data); // Log the fetched data
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [categoryId]);

  // Moved or removed formatCategoryTitle if not needed elsewhere

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !articles.length) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || `No articles found for "${categoryId}"`} {/* Use raw categoryId or format here */}
          </h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="max-w-6xl mx-auto p-6">
        <header className="mb-8 pb-2 border-b-2 border-blue-500">
          <h1 className="text-2xl text-gray-800">{categoryId.toUpperCase()}</h1> {/* Reverted to uppercase for now */}
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <Link key={article.id} to={`/article/${article.id}`}>
              <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                {(article.thumbnail_url || article.main_image_url) && (
                  <CustomImage src={article.thumbnail_url || article.main_image_url} alt={article.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h2 className="text-xl text-gray-800">{article.title}</h2>
                  <p className="text-gray-600">{article.summary}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </MainLayout>
  );
};

export default CategoryPage;
