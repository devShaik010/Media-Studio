import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';

const ErrorPage = () => {
  const location = useLocation();

  const content = {
    title: 'Page Not Found',
    message: `The page "${location.pathname}" doesn't exist or has been moved.`,
    backHome: 'Back to Home'
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <h1 className="text-2xl mb-4 text-gray-800">{content.title}</h1>
        <p className="text-gray-600 mb-8">{content.message}</p>
        <Link to="/" className="inline-block py-2 px-4 bg-blue-500 text-white no-underline rounded hover:bg-blue-700">
          {content.backHome}
        </Link>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
