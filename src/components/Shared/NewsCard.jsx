import React from 'react';
import Image from './Image';
import './NewsCard.css';

const NewsCard = ({ category, headline, timestamp, thumbnail, source }) => {
  return (
    <article className="news-card">
      <div className="news-thumbnail">
        <Image 
          src={thumbnail} 
          alt={headline}
          className="news-image"
          fallbackSrc="https://placehold.co/600x400?text=News+Image"
        />
      </div>
      <div className="news-content">
        {source && <div className="news-source">{source}</div>}
        <h4 className="news-headline">{headline}</h4>
        {timestamp && <time className="news-timestamp">{timestamp}</time>}
      </div>
    </article>
  );
};

export default NewsCard;