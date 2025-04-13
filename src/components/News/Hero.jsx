import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import Image from '@components/Shared/Image';
import './Hero.css';

const Hero = () => {
  const { language, articles } = useLanguage();

  const getArticleUrl = (slug) => {
    return `/${language}/article/${slug}`;
  };

  // Get the latest 3 articles sorted by date
  const heroArticles = [...articles]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 3);

  const [mainArticle, ...sideArticles] = heroArticles;

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Main Featured Article */}
        <Link to={getArticleUrl(mainArticle.slug)} className="hero-main">
          <div className="hero-image-wrapper">
            <Image 
              src={mainArticle.heroImage} 
              alt={mainArticle.title}
              className="hero-image"
            />
          </div>
          <div className="hero-content">
            <span className="hero-category">{mainArticle.category}</span>
            <h1 className="hero-title">{mainArticle.title}</h1>
            <p className="hero-summary">{mainArticle.summary}</p>
          </div>
        </Link>

        {/* Side Articles */}
        <div className="hero-side">
          {sideArticles.map(article => (
            <Link 
              key={article.id} 
              to={getArticleUrl(article.slug)} 
              className="hero-side-article"
            >
              <div className="side-image-wrapper">
                <Image 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="side-image"
                />
              </div>
              <div className="side-content">
                <span className="side-category">{article.category}</span>
                <h2 className="side-title">{article.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;