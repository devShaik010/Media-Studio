import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchArticleById, fetchRelatedArticles } from '../services/articlesService'; // Added fetchRelatedArticles
import { format } from 'date-fns';
import SocialShareButtons from '@components/Shared/SocialShareButtons';
import { arSA } from 'date-fns/locale';
import CustomImage from '@components/Shared/CustomImage';
import RelatedArticles from '../components/Article/RelatedArticles'; // Import RelatedArticles component

const Article = () => {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  // Optional: separate loading/error state for related articles
  // const [relatedLoading, setRelatedLoading] = useState(false); 
  // const [relatedError, setRelatedError] = useState(null);


  useEffect(() => {
    const loadArticleAndRelated = async () => {
      try {
        setLoading(true);
        setArticle(null); // Reset article on ID change
        setRelatedArticles([]); // Reset related articles
        const mainArticleData = await fetchArticleById(id);
        setArticle(mainArticleData);

        if (mainArticleData && mainArticleData.id) { // Condition updated: no longer checks for category
          // setRelatedLoading(true); // If using separate loading state
          try {
            const relatedData = await fetchRelatedArticles(mainArticleData.id); // Call updated: only pass ID
            setRelatedArticles(relatedData);
          } catch (relatedErr) {
            console.error("Failed to load related articles:", relatedErr);
            // setRelatedError(relatedErr.message); // If using separate error state
          } finally {
            // setRelatedLoading(false); // If using separate loading state
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticleAndRelated();
  }, [id]);

  if (loading && !article) { // Show main loading only if article is not yet set
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
      <article className="max-w-4xl mx-auto px-2 py-4" dir="rtl" lang="ur"> {/* Reduced px and py */}
        {/* 1. Title with underline */}
        <div className="relative mb-6 pb-3"> {/* Wrapper for title and underline */}
          <h1 className="text-4xl font-bold text-gray-900 text-right">{article.title}</h1>
          <div className="absolute bottom-0 right-0 w-1/4 h-0.5 bg-blue-800"></div> {/* The underline */}
        </div>

        {/* 2. Image (without border-radius) */}
        {(article.main_image_url || article.thumbnail_url) && (
          <div className="mb-6">
            <CustomImage
              src={article.main_image_url || article.thumbnail_url}
              alt={article.title}
              className="w-full h-[400px] object-cover shadow-lg" // Removed rounded-lg
            />
          </div>
        )}

        {/* 3. Time and Share Icons Row */}
        <div className="flex justify-between items-center my-6" dir="rtl"> {/* Ensure RTL direction for this row if needed, though share buttons are LTR internally */}
          <div className="text-sm text-gray-600">
            <time className="numbers" dateTime={article.publish_date} lang="ur">
              {article.publish_date ? format(new Date(article.publish_date), 'PPP', { locale: arSA }) : 'N/A'}
            </time>
          </div>
          <SocialShareButtons url={window.location.href} title={article.title} />
        </div>

        {/* 4. Article Content */}
        <div className="prose prose-2xl max-w-none text-right text-gray-700" dir="rtl"> {/* Increased size to 2xl and dimmed text color */}
          <div
            className="mb-8 leading-[2.5]" // Specific classes for the inner div if needed, prose styles will cascade
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* YouTube Video Section (remains at the end) */}
        {article.youtube_link && (
          <div className="mt-8" dir="rtl"> {/* Added dir="rtl" for consistency */}
            {/* Video Title with matching theme */}
            <h3 className="text-xl font-bold mb-4 flex items-center text-right"> {/* Added text-right */}
              <div className="w-1 h-6 bg-blue-800 ml-2"></div> {/* ml-2 will appear on the right in RTL */}
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

        {/* Related Articles Section */}
        {relatedArticles && relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
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
