import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import { getArticlesByCategory } from '@utils/articleUtils';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const articles = getArticlesByCategory(categoryId);

  return (
    <MainLayout>
      <main className="category-page">
        <header className="category-header">
          <h1>{categoryId.toUpperCase()}</h1>
        </header>
        <div className="category-grid">
          {articles.map(article => (
            <article key={article.id} className="category-article">
              <img src={article.thumbnail} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
            </article>
          ))}
        </div>
      </main>
    </MainLayout>
  );
};

export default CategoryPage;