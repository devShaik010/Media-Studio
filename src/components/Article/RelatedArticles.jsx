import React from 'react';
import { Link } from 'react-router-dom';
// Removed import './RelatedArticles.css';

const RelatedArticles = ({ articles }) => {
  if (!articles?.length) return null;

  return (
    // Applied Tailwind classes for container, border, padding, margin
    <aside className="max-w-4xl mx-auto my-8 py-8 px-4 border-t border-gray-200"> 
      {/* Applied Tailwind classes for heading */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Related Stories</h2> 
      {/* Applied Tailwind classes for grid layout and gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
        {articles.map((article) => (
          <Link 
            to={`/article/${article.slug}`} 
            key={article.id} 
            // Added group class for hover effects
            className="block text-inherit no-underline group" 
          >
            {/* Applied Tailwind classes for thumbnail aspect ratio, margin, rounded corners, overflow */}
            <div className="aspect-video mb-3 rounded overflow-hidden"> 
              {/* Applied Tailwind classes for image sizing and object fit */}
              <img src={article.thumbnail} alt={article.title} loading="lazy" className="w-full h-full object-cover" /> 
            </div>
            <div className="related-content"> {/* No specific styles needed here */}
              {/* Applied Tailwind classes for category text style */}
              <span className="block text-xs text-blue-600 uppercase mb-1">{article.category}</span> 
              {/* Applied Tailwind classes for title text style, hover effect, and transition */}
              <h3 className="text-base leading-snug m-0 text-gray-800 group-hover:text-blue-600 transition-colors">{article.title}</h3> 
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default RelatedArticles;
