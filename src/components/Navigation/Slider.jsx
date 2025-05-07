import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

// Define menu items (English only)
const menuItems = [
  { text: 'Home', icon: <HomeOutlinedIcon />, path: '/' },
  {
    text: 'World',
    icon: <PublicOutlinedIcon />,
    subItems: ['Americas', 'Asia', 'Europe', 'Middle East'] // Sub-items are text only, no paths defined
  },
  { text: 'Broadcasts', icon: <RadioOutlinedIcon />, path: '/broadcasts' },
  { text: 'Latest', icon: <NewspaperOutlinedIcon />, path: '/latest' }
];

const socialIcons = [
  { icon: <FacebookIcon />, link: 'https://facebook.com/voiceofamerica', label: 'Facebook' },
  { icon: <TwitterIcon />, link: 'https://twitter.com/voanews', label: 'Twitter' },
  { icon: <YouTubeIcon />, link: 'https://youtube.com/voanews', label: 'YouTube' },
  { icon: <InstagramIcon />, link: 'https://instagram.com/voanews', label: 'Instagram' }
];

const Slider = ({ open, onClose }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleExpand = (text) => {
    setExpandedItem(expandedItem === text ? null : text);
  };

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
            : '-translate-x-full',
          'left-0' // Always left for LTR
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header with improved border contrast */}
        <div className="h-16 flex items-center justify-start px-4 border-b border-white/30 flex-shrink-0">
          <IconButton
            onClick={onClose}
            aria-label="Close menu"
            className="!text-white hover:!bg-white/20 !transition-colors"
          >
            <CloseIcon />
          </IconButton>
          <h2 id="drawer-title" className="sr-only">Navigation Menu</h2>
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
                    'border-l-4', // Always left border for LTR
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
                    className={clsx('!text-white', 'text-sm')} // Always text-sm for English
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
                  <List disablePadding className="bg-blue-900 pl-10"> {/* Always pl-10 for LTR */}
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem} disablePadding>
                        <ListItemButton
                          onClick={onClose}
                          className={clsx(
                            'px-6 py-2 text-white transition-all duration-200 ease-in-out',
                            'text-sm', // Always text-sm for English
                            'hover:bg-blue-800 hover:border-l-2 hover:border-yellow-400' // Always left border for LTR
                          )}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText
                            primary={subItem}
                            className="!text-white"
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
            'font-sans' // Always font-sans for English
          )}>
            Follow us
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
