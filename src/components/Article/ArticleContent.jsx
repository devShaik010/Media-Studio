import React from 'react';
import Image from '../Shared/Image';
import './ArticleContent.css';

const ArticleContent = ({ article }) => {
  if (!article) return null;

  // Ensure content is an array before mapping
  const content = Array.isArray(article.content) ? article.content : [];

  return (
    <article className="article-container">
      <div className="article-hero">
        <Image 
          src={article.heroImage} 
          alt={article.title}
          className="hero-image"
          fallbackSrc="https://placehold.co/1200x600?text=Article+Image"
        />
      </div>
      
      <div className="article-header">
        <div className="article-meta">
          <span className="article-category">{article.category}</span>
          <span className="article-date">
            {new Date(article.publishDate).toLocaleDateString()}
          </span>
        </div>
        <h1 className="article-title">{article.title}</h1>
        {article.author && (
          <div className="article-author">
            {article.author.avatar && (
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="author-avatar"
              />
            )}
            <div className="author-info">
              <span className="author-name">{article.author.name}</span>
              <span className="author-role">{article.author.role}</span>
            </div>
          </div>
        )}
      </div>

      <div className="article-body">
        {content.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              return <p key={index}>{block.text}</p>;
            case 'quote':
              return (
                <blockquote key={index}>
                  <p>{block.text}</p>
                  {block.author && (
                    <cite>
                      {block.author}
                      {block.role && <span>, {block.role}</span>}
                    </cite>
                  )}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="article-tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
};

export default ArticleContent;