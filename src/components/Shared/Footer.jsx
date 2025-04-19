import React from 'react';
// Removed import './Footer.css';

const Footer = () => {
  return (
    // Footer container with background color and text color
    <footer className="bg-blue-800 text-white py-12 mt-auto">
      {/* Footer content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Follow Us section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200">Facebook</a>
            <a href="#" className="hover:text-blue-200">Twitter</a>
            <a href="#" className="hover:text-blue-200">YouTube</a>
            <a href="#" className="hover:text-blue-200">Instagram</a>
          </div>
        </div>

        {/* Languages section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Languages</h3>
          <ul>
            <li><a href="#" className="hover:text-blue-200">English</a></li>
            <li><a href="#" className="hover:text-blue-200">Spanish</a></li>
            <li><a href="#" className="hover:text-blue-200">French</a></li>
            <li><a href="#" className="hover:text-blue-200">Arabic</a></li>
          </ul>
        </div>

        {/* About Us section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul>
            <li><a href="#" className="hover:text-blue-200">About Media Studio</a></li>
            <li><a href="#" className="hover:text-blue-200">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-200">Terms of Use</a></li>
            <li><a href="#" className="hover:text-blue-200">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      {/* Footer bottom with copyright */}
      <div className="border-t border-blue-600 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Media Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
