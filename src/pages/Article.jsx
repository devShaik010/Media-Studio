import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../services/articlesService';
import { format } from 'date-fns';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4" dir="rtl">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mr-auto"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center" dir="rtl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error || "مضمون نہیں ملا"}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 py-8" dir="rtl" lang="ur">
        {/* Hero Image */}
        {(article.main_image_url || article.thumbnail_url) && (
          <div className="mb-6">
            <img
              src={article.main_image_url || article.thumbnail_url}
              alt={article.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Header with subtle bottom border */}
        <header className="mb-8 relative pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{article.title}</h1>
          <div className="flex items-center justify-end text-sm text-gray-600">
            <time className="numbers" dateTime={article.publish_date} lang="en">
              {format(new Date(article.publish_date), 'MMMM dd, yyyy')}
            </time>
          </div>
          {/* Subtle bottom line that doesn't span full width */}
          <div className="absolute bottom-0 right-0 w-1/4 h-0.5 bg-blue-800"></div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="mb-8 leading-[2.5]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* YouTube Video Section */}
        {article.youtube_link && (
          <div className="mt-8">
            {/* Video Title with matching theme */}
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-800 ml-2"></div>
              <span>متعلقہ ویڈیو</span>
            </h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(article.youtube_link)}`}
                className="w-full h-[400px] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${article.title} - ویڈیو`}
              />
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

// Helper function to extract YouTube video ID
const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/);
  return match ? match[1] : null;
};

export default Article;
