import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import './Headlines.css';

const Headlines = () => {
  const { articles, language } = useLanguage();
  const topHeadlines = articles.slice(0, 8);

  return (
    <div className="headlines-container">
      <div className="more-from-voa">
        <h3 className="section-title">
          {language === 'ur' ? 'وی او اے سے مزید' : 'More From VOA'}
        </h3>
        <div className="headlines-grid">
          {topHeadlines.map((article) => (
            <Link 
              to={`/article/${article.slug}`} 
              key={article.id}
              className="news-item"
            >
              <div className="news-thumbnail">
                <img src={article.thumbnail} alt={article.title} />
              </div>
              <div className="news-content">
                <div className="news-source">{article.source}</div>
                <h4 className="news-headline">{article.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Headlines;
