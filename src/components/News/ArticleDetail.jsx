import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useNewsData } from '../../hooks/useNewsData';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const { getArticleById, loading } = useNewsData();
  const article = getArticleById(articleId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Article not found</h2>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main Image */}
      {article.image && (
        <div className="mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex items-center text-gray-600">
          <time dateTime={article.date}>
            {format(new Date(article.date), 'MMMM dd, yyyy')}
          </time>
          {article.author && (
            <>
              <span className="mx-2">•</span>
              <span>By {article.author}</span>
            </>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {article.content && (
          <div
            className="mb-8 text-right"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </div>

      {/* YouTube Video Embed */}
      {article.videoUrl && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Related Video</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(article.videoUrl)}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </article>
  );
};

// Helper function to extract YouTube video ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default ArticleDetail;
