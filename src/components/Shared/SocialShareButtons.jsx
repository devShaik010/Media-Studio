import React from 'react';
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaShareAlt } from 'react-icons/fa';
// Removed FaXTwitter import as it's no longer used

// Helper function to encode URI components
const encode = (str) => encodeURIComponent(str);

const SocialShareButtons = ({ url, title }) => {
  const platforms = [
    {
      name: 'Facebook',
      IconComponent: FaFacebookF,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`, '_blank'),
    },
    // Removed X/Twitter platform
    {
      name: 'WhatsApp',
      IconComponent: FaWhatsapp,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => window.open(`https://api.whatsapp.com/send?text=${encode(title + ' ' + url)}`, '_blank'),
    },
    {
      name: 'Email',
      IconComponent: FaEnvelope,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => window.location.href = `mailto:?subject=${encode(title)}&body=${encode(url)}`,
    },
    {
      name: 'Share',
      IconComponent: FaShareAlt,
      color: 'bg-gray-500 hover:bg-gray-600',
      action: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: title,
              url: url,
            });
            console.log('Article shared successfully');
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          // Fallback for browsers that don't support Web Share API
          // You could copy to clipboard here or show a message
          alert('Web Share API not supported. You can manually copy the link.');
          console.log('Web Share API not supported. URL:', url, 'Title:', title);
        }
      },
    },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 my-6" dir="ltr"> {/* Use ltr for button layout */}
      {platforms.map((platform) => (
        <button
          key={platform.name}
          onClick={platform.action}
          aria-label={`Share on ${platform.name}`}
          className={`text-white p-3 rounded-md transition-colors duration-200 ${platform.color} w-12 h-12 flex items-center justify-center`}
        >
          <platform.IconComponent className="text-xl" />
        </button>
      ))}
    </div>
  );
};

export default SocialShareButtons;
