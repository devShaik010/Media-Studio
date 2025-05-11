import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you might want to link to a general news page

const CallToActionBanner = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 my-6 rounded-lg shadow-md text-center">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 font-english">
        Discover More Stories
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 font-english">
        Stay updated with the latest happenings from around the world.
      </p>
      <Link
        to="/category/all" // Example link, adjust as needed
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300 ease-in-out font-english"
      >
        View All News
      </Link>
    </div>
  );
};

export default CallToActionBanner;
