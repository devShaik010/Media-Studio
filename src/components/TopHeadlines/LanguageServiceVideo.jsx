import React from 'react';

const LanguageServiceVideo = ({ language }) => {
  return (
    <div className="video-item">
      <div className="video-thumbnail">
        <span role="img" aria-label="video">🎥</span>
      </div>
      <p>{language}</p>
    </div>
  );
};

export default LanguageServiceVideo;