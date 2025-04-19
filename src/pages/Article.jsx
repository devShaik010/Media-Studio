import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import { newsData, urduArticles } from '@data/newsData';
import MainLayout from '@layouts/MainLayout';
import ArticleContent from '@components/Article/ArticleContent';

const Article = () => {
  const { slug, lang } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Find article in both English and Urdu datasets
  const findArticle = (slug) => {
    const englishArticle = newsData.articles.find(a => a.slug === slug);
    const urduArticle = urduArticles.articles.find(a => a.slug === slug);
    
    // Return article based on URL pattern
    if (lang) {
      return lang === 'ur' ? urduArticle : englishArticle;
    }
    
    // For direct /article/:slug URLs, try to find in both
    return englishArticle || urduArticle;
  };

  const article = findArticle(slug);

  React.useEffect(() => {
    // Redirect to language-specific route if needed
    if (article && !lang) {
      const isUrduArticle = urduArticles.articles.some(a => a.slug === slug);
      navigate(`/${isUrduArticle ? 'ur' : 'en'}/article/${slug}`, { replace: true });
    }
  }, [slug, lang, article]);

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-[calc(100vh - 60px)] bg-white">
          <div className="max-w-screen-md mx-auto mt-16 mb-16 text-center p-8">
            <h2 className="text-2xl text-gray-800 mb-4">{language === 'ur' ? 'مضمون نہیں ملا' : 'Article Not Found'}</h2>
            <p className="text-gray-600 mb-8">
              {language === 'ur'
                ? 'مطلوبہ مضمون موجود نہیں ہے یا منتقل کر دیا گیا ہے۔'
                : 'The requested article does not exist or has been moved.'}
            </p>
            <a href={`/${language}`} className="inline-block py-2 px-4 bg-blue-500 text-white no-underline rounded hover:bg-blue-700">
              {language === 'ur' ? 'ہوم پیج پر واپس جائیں' : 'Back to Home'}
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ArticleContent article={article} />
    </MainLayout>
  );
};

export default Article;
