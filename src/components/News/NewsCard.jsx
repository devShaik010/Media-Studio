import React from 'react';

const NewsCard = ({ category, headline, timestamp, thumbnail }) => {
  return (
    <article className="news-card">
      <div className="news-card-image">
        <img src={thumbnail} alt={headline} loading="lazy" />
      </div>
      <div className="news-card-content">
        <span className="news-category">{category}</span>
        <h3 className="news-card-headline">{headline}</h3>
        <span className="news-timestamp">{timestamp}</span>
      </div>
    </article>
  );
};

export default NewsCard;