import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import MainLayout from '@layouts/MainLayout';

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <h1 className="text-2xl mb-4 text-gray-800">{content[language]?.title}</h1>
        <p className="text-gray-600 mb-8">{content[language]?.message}</p>
        <Link to={`/${language}`} className="inline-block py-2 px-4 bg-blue-500 text-white no-underline rounded hover:bg-blue-700">
          {content[language]?.backHome}
        </Link>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
