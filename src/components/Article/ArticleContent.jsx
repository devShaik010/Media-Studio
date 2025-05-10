import React from 'react';
import CustomImage from '../Shared/Image';
import { formatDate } from '@utils/dateFormatter'; // Import shared utility

const ArticleContent = ({ article }) => {

  if (!article) return null;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 text-left">
      <div className="-mx-4 -mt-8 mb-8"> {/* Adjusted margins based on container padding */}
        <CustomImage
          src={article.main_image_url || article.thumbnail_url} // Use Supabase field names
          alt={article.title}
          className="w-full h-auto max-h-[500px] object-cover" // Tailwind classes for hero image
          fallbackSrc="https://placehold.co/1200x600?text=Article+Image"
        />
      </div>

      <div className="mb-8"> {/* article-header */}
        {/* Category and Date */}
        <div className="flex flex-row gap-4 mb-4"> {/* article-meta */}
          {/* Category is not fetched by service, removing for now */}
          <span className="text-gray-500 numbers"> {/* article-date */}
            {formatDate(article.publish_date)} {/* Use shared utility and Supabase field name */}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl leading-tight mb-6 text-gray-800">{article.title}</h1> {/* article-title */}
        {/* Author is not fetched by service, removing for now */}
      </div>

      <div className="text-lg md:text-xl leading-relaxed text-gray-800"> {/* article-body */}
        {/* Assuming content is a single HTML string from the service */}
        <div
          className="mb-8 leading-relaxed" // Adjusted leading
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Tags are not fetched by service, removing for now */}
    </article>
  );
};

export default ArticleContent;
