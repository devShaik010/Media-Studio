import React from 'react';

const NewsItem = ({ source, headline, thumbnail }) => {
  const handleClick = () => {
    // Add navigation logic here
    console.log('Navigate to article:', headline);
  };

  return (
    <article className="news-item">
      <div className="news-thumbnail">
        <img src={thumbnail} alt={headline} loading="lazy" />
      </div>
      <div className="news-content">
        <div className="news-source">{source}</div>
        <h4 
          className="news-headline"
          onClick={handleClick}
          role="link"
          tabIndex={0}
        >
          {headline}
        </h4>
      </div>
    </article>
  );
};

export default NewsItem;