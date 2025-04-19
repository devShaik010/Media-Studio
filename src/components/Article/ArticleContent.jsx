import React from 'react';
import Image from '../Shared/Image';
// Removed import './ArticleContent.css';

const ArticleContent = ({ article }) => {
  if (!article) return null;

  // Ensure content is an array before mapping
  // Ensure content is an array before mapping
  const content = Array.isArray(article.content) ? article.content : [];

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="-mx-4 -mt-8 mb-8"> {/* Adjusted margins based on container padding */}
        <Image 
          src={article.heroImage} 
          alt={article.title}
          className="w-full h-auto max-h-[500px] object-cover" // Tailwind classes for hero image
          fallbackSrc="https://placehold.co/1200x600?text=Article+Image"
        />
      </div>
      
      <div className="mb-8"> {/* article-header */}
        <div className="flex gap-4 mb-4"> {/* article-meta */}
          <span className="text-blue-600 font-semibold uppercase">{article.category}</span> {/* article-category */}
          <span className="text-gray-500"> {/* article-date */}
            {new Date(article.publishDate).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl leading-tight mb-6 text-gray-800">{article.title}</h1> {/* article-title */}
        {article.author && (
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200"> {/* article-author */}
            {article.author.avatar && (
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="w-12 h-12 rounded-full object-cover" // author-avatar
              />
            )}
            <div className="flex flex-col"> {/* author-info */}
              <span className="font-semibold text-gray-800">{article.author.name}</span> {/* author-name */}
              <span className="text-sm text-gray-500">{article.author.role}</span> {/* author-role */}
            </div>
          </div>
        )}
      </div>

      <div className="text-lg md:text-xl leading-relaxed text-gray-800"> {/* article-body */}
        {content.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              // Added mb-6 directly to p tag
              return <p key={index} className="mb-6">{block.text}</p>; 
            case 'quote':
              return (
                // Added Tailwind classes for blockquote and cite
                <blockquote key={index} className="my-8 px-8 py-6 bg-gray-50 border-l-4 border-blue-600"> 
                  <p className="mb-4">{block.text}</p> {/* Added margin bottom to quote text */}
                  {block.author && (
                    <cite className="block mt-4 text-sm text-gray-500"> 
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
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200"> {/* article-tags */}
          {article.tags.map(tag => (
            // Added Tailwind classes for tag
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-500">#{tag}</span> 
          ))}
        </div>
      )}
    </article>
  );
};

export default ArticleContent;
