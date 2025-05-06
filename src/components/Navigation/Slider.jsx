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
import clsx from 'clsx';

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
  { icon: <FacebookIcon />, link: 'https://facebook.com/voiceofamerica', label: 'Facebook' },
  { icon: <TwitterIcon />, link: 'https://twitter.com/voanews', label: 'Twitter' },
  { icon: <YouTubeIcon />, link: 'https://youtube.com/voanews', label: 'YouTube' },
  { icon: <InstagramIcon />, link: 'https://instagram.com/voanews', label: 'Instagram' }
];

const Slider = ({ open, onClose }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ur';
  const [expandedItem, setExpandedItem] = useState(null);
  const menuItems = getMenuItems(language);

  const handleExpand = (text) => {
    setExpandedItem(expandedItem === text ? null : text);
  };

  // Determine font based on language
  const textFontFamily = language === 'ur' ? 'var(--font-ur)' : 'inherit';
  const textSize = language === 'ur' ? 'text-base' : 'text-sm';

  return (
    <>
      {/* Overlay with improved opacity transition */}
      <div 
        className={clsx(
          'fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-[1200] transition-opacity duration-300 ease-in-out',
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
        aria-hidden={!open}
      />
      
      {/* Slider Container - Updated with a more vibrant blue for better UX */}
      <div 
        className={clsx(
          'fixed top-0 bottom-0 w-80 bg-blue-700 z-[1300] shadow-xl flex flex-col transition-transform duration-300 ease-in-out',
          'transform',
          open 
            ? 'translate-x-0' 
            : isRTL ? 'translate-x-full' : '-translate-x-full',
          isRTL ? 'right-0' : 'left-0'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header with improved border contrast */}
        <div className="h-16 flex items-center justify-start px-4 border-b border-white/30 flex-shrink-0 rtl:justify-end">
          <IconButton
            onClick={onClose}
            aria-label={language === 'ur' ? 'بند کریں' : 'Close menu'}
            className="!text-white hover:!bg-white/20 !transition-colors"
          >
            <CloseIcon />
          </IconButton>
          <h2 id="drawer-title" className="sr-only">{language === 'ur' ? 'نیویگیشن مینو' : 'Navigation Menu'}</h2>
        </div>

        {/* Menu Items List with improved active states */}
        <List className="py-2 flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => item.subItems ? handleExpand(item.text) : onClose()}
                  className={clsx(
                    'flex items-center gap-4 px-6 py-3 text-white cursor-pointer transition-all duration-200 ease-in-out',
                    'border-l-4 rtl:border-l-0 rtl:border-r-4',
                    // Improved active state with clearer visual indication
                    expandedItem === item.text || (!item.subItems && window.location.pathname === item.path)
                      ? 'border-yellow-400 bg-blue-800'
                      : 'border-transparent hover:bg-blue-600 hover:border-blue-300',
                    'focus:bg-blue-800 focus:border-yellow-400'
                  )}
                  component={item.path ? Link : 'button'}
                  to={item.path}
                >
                  <ListItemIcon className="!text-white !min-w-[auto]">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={clsx('!text-white', textSize)}
                    primaryTypographyProps={{
                      style: { fontFamily: textFontFamily }
                    }}
                  />
                  {item.subItems && (
                    <span className="ml-auto text-white">
                      {expandedItem === item.text ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  )}
                </ListItemButton>
              </ListItem>
              
              {/* Sub Menu with improved visibility and active states */}
              {item.subItems && (
                <Collapse in={expandedItem === item.text} timeout="auto" unmountOnExit>
                  <List disablePadding className="bg-blue-900 pl-10 rtl:pr-10 rtl:pl-0">
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem} disablePadding>
                        <ListItemButton
                          onClick={onClose}
                          className={clsx(
                            'px-6 py-2 text-white transition-all duration-200 ease-in-out',
                            textSize,
                            'hover:bg-blue-800 hover:border-l-2 hover:border-yellow-400 rtl:hover:border-l-0 rtl:hover:border-r-2'
                          )}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText
                            primary={subItem}
                            className="!text-white"
                            primaryTypographyProps={{
                              style: { fontFamily: textFontFamily }
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Footer with improved visibility */}
        <div className="px-6 py-4 border-t border-white/30 bg-blue-800 flex-shrink-0">
          <p className={clsx(
            "text-white text-sm mb-3 font-medium",
            language === 'ur' ? 'font-[--font-ur] text-base' : 'font-sans'
          )}>
            {language === 'ur' ? 'ہمیں فالو کریں' : 'Follow us'}
          </p>
          <div className="flex justify-start gap-3">
            {socialIcons.map((social, index) => (
              <IconButton
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`}
                className="!text-white !bg-blue-600 hover:!bg-blue-500 !transition-all !shadow-sm"
                size="small"
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