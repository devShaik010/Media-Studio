import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import { getArticlesByCategory } from '@utils/articleUtils';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const articles = getArticlesByCategory(categoryId);

  return (
    <MainLayout>
      <main className="max-w-6xl mx-auto p-6">
        <header className="mb-8 pb-2 border-b-2 border-blue-500">
          <h1 className="text-2xl text-gray-800">{categoryId.toUpperCase()}</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={article.thumbnail} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl text-gray-800">{article.title}</h2>
                <p className="text-gray-600">{article.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </MainLayout>
  );
};

export default CategoryPage;
