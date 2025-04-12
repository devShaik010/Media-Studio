import React from 'react';
import LanguageServiceVideo from './LanguageServiceVideo';

const LanguageServices = () => {
  const languages = ['DEEWA', 'BAMBARA', 'PORTUGUESE'];

  return (
    <div className="language-services">
      <h3>From VOA's Language Services</h3>
      <div className="video-list">
        {languages.map((language, index) => (
          <LanguageServiceVideo key={index} language={language} />
        ))}
      </div>
      <p className="video-summary">
        54 VIDEOS | 33.1 HOURS OF VIDEO | 0 ARTICLES<br />
        added by 48 language services in the last 24 hours
      </p>
      <button className="view-more-btn">View More at VOA Global</button>
    </div>
  );
};

export default LanguageServices;