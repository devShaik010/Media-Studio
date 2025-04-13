import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import MainLayout from '@layouts/MainLayout';
import './ErrorPage.css';

const ErrorPage = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const content = {
    en: {
      title: 'Page Not Found',
      message: `The page "${location.pathname}" doesn't exist or has been moved.`,
      backHome: 'Back to Home'
    },
    ur: {
      title: 'صفحہ نہیں ملا',
      message: 'آپ جس صفحے کی تلاش کر رہے ہیں وہ موجود نہیں ہے یا منتقل کر دیا گیا ہے۔',
      backHome: 'ہوم پیج پر واپس جائیں'
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <MainLayout
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={handleDrawerToggle}
    >
      <div className="error-page">
        <h1>{content[language]?.title}</h1>
        <p>{content[language]?.message}</p>
        <Link to={`/${language}`} className="back-home-button">
          {content[language]?.backHome}
        </Link>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;