import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook size={24} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter size={24} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaYoutube size={24} />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaInstagram size={24} />, url: 'https://instagram.com', label: 'Instagram' }
  ];

  const aboutLinks = [
    { path: '/about', label: 'About Media Studio' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/terms', label: 'Terms of Use' },
    { path: '/privacy', label: 'Privacy Policy' }
  ];

  // New navigation links based on Slider menuItems with paths
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/broadcasts', label: 'Broadcasts' },
    { path: '/latest', label: 'Latest' }
  ];

  return (
    <footer className="bg-blue-800 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Changed to md:grid-cols-3 */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="hover:text-blue-200 transition-colors duration-200"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            {aboutLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* New Navigation Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-600 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Media Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
