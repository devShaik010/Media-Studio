import React from 'react';
import { Link } from 'react-router-dom';
import CustomImage from '../Shared/Image'; // Import shared Image component
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale'; // For date formatting

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
            to={`/article/${article.id}`} // Use article.id for link
            key={article.id}
            // Added group class for hover effects
            className="block text-inherit no-underline group"
          >
            {/* Applied Tailwind classes for thumbnail aspect ratio, margin, rounded corners, overflow */}
            <div className="aspect-video mb-3 rounded overflow-hidden">
              {/* Use shared Image component and Supabase field names */}
              <CustomImage src={article.thumbnail_url || article.main_image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <div className="related-content p-1"> {/* Added small padding for content below image */}
              {/* Applied Tailwind classes for title text style, hover effect, and transition */}
              <h3 className="text-base font-semibold leading-snug m-0 text-gray-800 group-hover:text-blue-600 transition-colors">{article.title}</h3>
              {article.publish_date && (
                <time dateTime={article.publish_date} className="block text-xs text-gray-500 mt-1 numbers" lang="ur">
                  {format(new Date(article.publish_date), 'PPP', { locale: arSA })}
                </time>
              )}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default RelatedArticles;
