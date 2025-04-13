import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import RadioOutlinedIcon from '@mui/icons-material/RadioOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Slider.css';

// Define menu items based on language
const getMenuItems = (lang) => {
  if (lang === 'ur') {
    return [
      { text: 'ہوم', icon: <HomeOutlinedIcon />, path: '/ur' },
      { 
        text: 'دنیا', 
        icon: <PublicOutlinedIcon />,
        subItems: ['امریکہ', 'ایشیا', 'یورپ', 'مشرق وسطی']
      },
      { text: 'نشریات', icon: <RadioOutlinedIcon />, path: '/ur/broadcasts' },
      { text: 'تازہ ترین', icon: <NewspaperOutlinedIcon />, path: '/ur/latest' },
      { text: 'زبانیں', icon: <LanguageOutlinedIcon />, path: '/ur/languages' }
    ];
  }
  
  return [
    { text: 'Home', icon: <HomeOutlinedIcon />, path: '/en' },
    { 
      text: 'World', 
      icon: <PublicOutlinedIcon />,
      subItems: ['Americas', 'Asia', 'Europe', 'Middle East']
    },
    { text: 'Broadcasts', icon: <RadioOutlinedIcon />, path: '/en/broadcasts' },
    { text: 'Latest', icon: <NewspaperOutlinedIcon />, path: '/en/latest' },
    { text: 'Languages', icon: <LanguageOutlinedIcon />, path: '/en/languages' }
  ];
};

const socialIcons = [
  { icon: <FacebookIcon />, link: 'https://facebook.com/voiceofamerica' },
  { icon: <TwitterIcon />, link: 'https://twitter.com/voanews' },
  { icon: <YouTubeIcon />, link: 'https://youtube.com/voanews' },
  { icon: <InstagramIcon />, link: 'https://instagram.com/voanews' }
];

const Slider = ({ open, onClose }) => {
  const { language } = useLanguage();
  const [expandedItem, setExpandedItem] = useState(null);
  const menuItems = getMenuItems(language);

  const handleExpand = (text) => {
    setExpandedItem(expandedItem === text ? null : text);
  };

  return (
    <>
      <div 
        className={`slider-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`slider-container ${open ? 'open' : ''}`}>
        <div className="slider-header">
          <IconButton
            onClick={onClose}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <List className="menu-items">
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => item.subItems ? handleExpand(item.text) : onClose()}
                  className="menu-item"
                  component={item.path ? Link : 'button'}
                  to={item.path}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon className="menu-item-icon">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    className="menu-item-text"
                    primaryTypographyProps={{
                      style: {
                        color: 'white',
                        fontFamily: language === 'ur' ? 'var(--font-ur)' : 'var(--font-en)'
                      }
                    }}
                  />
                  {item.subItems && (
                    expandedItem === item.text ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              {item.subItems && (
                <Collapse in={expandedItem === item.text}>
                  <List className="sub-menu">
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem}
                        className="menu-item"
                        onClick={onClose}
                      >
                        <ListItemText 
                          primary={subItem}
                          className="menu-item-text"
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        <div className="slider-footer">
          <p className="social-links-title">
            {language === 'ur' ? 'ہمیں فالو کریں' : 'Follow us'}
          </p>
          <div className="social-icons">
            {socialIcons.map((social, index) => (
              <IconButton
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;