import React from 'react';
import NewsCard from './NewsCard';
import './LatestNews.css';

const LatestNews = () => {
  const latestNews = [
    {
      category: 'WORLD NEWS',
      headline: 'UN Security Council calls for immediate Gaza ceasefire',
      timestamp: '2 HOURS AGO',
      thumbnail: 'https://gdb.voanews.com/db210a4e-4ebe-4379-3433-08dd5c897904_w256_r1.jpg'
    },
    {
      category: 'TECHNOLOGY',
      headline: 'AI companies agree to safeguards on election misinformation',
      timestamp: '3 HOURS AGO',
      thumbnail: 'https://gdb.voanews.com/db210a4e-4ebe-4379-3433-08dd5c897904_w256_r1.jpg'
    },
    {
      category: 'HEALTH',
      headline: 'WHO announces new strategy to combat drug-resistant infections',
      timestamp: '4 HOURS AGO',
      thumbnail: 'https://gdb.voanews.com/db210a4e-4ebe-4379-3433-08dd5c897904_w256_r1.jpg'
    },
    {
      category: 'BUSINESS',
      headline: 'Global markets react to latest economic indicators',
      timestamp: '5 HOURS AGO',
      thumbnail: 'https://gdb.voanews.com/db210a4e-4ebe-4379-3433-08dd5c897904_w256_r1.jpg'
    }
  ];

  return (
    <section className="latest-news-container">
      <div className="latest-news-header">
        <h2 className="section-title">Latest News</h2>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="news-cards-grid">
        {latestNews.map((news, index) => (
          <NewsCard 
            key={index}
            category={news.category}
            headline={news.headline}
            timestamp={news.timestamp}
            thumbnail={news.thumbnail}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestNews;