import React from 'react';
import LanguageServices from './LanguageServices';
import NewsItem from './NewsItem';
import './Headlines.css';

const Headlines = () => {
  const newsItems = [
    {
      source: 'VOA KURDISH',
      headline: "Syria's interim constitution raises fears of sectarian division",
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'VOA KURDISH',
      headline: "Public release of man's confession sparks legal concerns",
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'VOA KURDISH',
      headline: 'Senior ISIS leader Abu Khadija killed in Iraqi intelligence operation',
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'VOA RUSSIAN',
      headline: 'Putin tries to punt decision on Ukraine back to Trump',
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'Vatican',
      headline: "Francis stable, out of 'imminent danger' of death",
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'UN',
      headline: 'Iran using drones to enforce hijab law',
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'VOA RUSSIAN',
      headline: "Analysts see flaws in Syria's temporary constitution",
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
    {
      source: 'Chinese Officials',
      headline: 'Look to limit social media and screen time in China',
      thumbnail: 'https://gdb.voanews.com/ce503712-2e69-4236-09ec-08dd5c8b1668_cx0_cy4_cw0_w256_r1.jpeg'
    },
  ];

  return (
    <div className="headlines-container">
      <div className="more-from-voa">
        <h3 className="section-title">More From VOA</h3>
        <div className="headlines-grid">
          {newsItems.map((item, index) => (
            <NewsItem 
              key={index} 
              source={item.source} 
              headline={item.headline} 
              thumbnail={item.thumbnail}
            />
          ))}
        </div>
      </div>
      <div className="language-services-wrapper">
        <LanguageServices />
      </div>
    </div>
  );
};

export default Headlines;
