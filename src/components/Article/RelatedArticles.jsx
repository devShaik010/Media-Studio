import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedArticles.css';

const RelatedArticles = ({ articles }) => {
  if (!articles?.length) return null;

  return (
    <aside className="related-articles">
      <h2>Related Stories</h2>
      <div className="related-grid">
        {articles.map((article) => (
          <Link 
            to={`/article/${article.slug}`} 
            key={article.id} 
            className="related-item"
          >
            <div className="related-thumbnail">
              <img src={article.thumbnail} alt={article.title} loading="lazy" />
            </div>
            <div className="related-content">
              <span className="related-category">{article.category}</span>
              <h3 className="related-title">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default RelatedArticles;