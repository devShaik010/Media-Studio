import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
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

const menuItems = [
  { 
    text: 'Home', 
    icon: <HomeOutlinedIcon />,
  },
  { 
    text: 'World',
    icon: <PublicOutlinedIcon />,
    subItems: ['USA', 'Asia', 'Africa', 'Europe', 'Middle East']
  },
  { 
    text: 'Broadcast Programs', 
    icon: <RadioOutlinedIcon />,
  },
  { 
    text: 'Latest Global News', 
    icon: <NewspaperOutlinedIcon />,
  },
  { 
    text: 'VOA Languages', 
    icon: <LanguageOutlinedIcon />,
  },
];

const socialIcons = [
  { icon: <FacebookIcon />, link: 'https://facebook.com/voiceofamerica' },
  { icon: <TwitterIcon />, link: 'https://twitter.com/voa' },
  { icon: <YouTubeIcon />, link: 'https://youtube.com/voiceofamerica' },
  { icon: <InstagramIcon />, link: 'https://instagram.com/voa' },
];

const Slider = ({ open, onClose }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleExpand = (text) => {
    setExpandedItem(expandedItem === text ? null : text);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-theme-dark/40 backdrop-blur-sm transition-all duration-300 z-40
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Slider */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-theme-navy z-50 
          transform transition-all duration-300 ease-out shadow-2xl font-arial
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-white/20">
          <IconButton
            onClick={onClose}
            className="hover:rotate-90 transition-transform duration-200"
            size="large"
            sx={{ color: '#d1e1ee' }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Menu Items */}
        <List className="py-2">
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => item.subItems && handleExpand(item.text)}
                  className="px-6 py-3 hover:bg-white/10 transition-colors duration-200"
                  sx={{ color: '#d1e1ee' }}
                >
                  <ListItemIcon sx={{ color: '#d1e1ee', minWidth: '40px' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    className="font-arial text-[14px] font-normal"
                    primaryTypographyProps={{
                      style: { color: '#d1e1ee' }
                    }}
                  />
                  {item.subItems && (
                    <span className="text-[#d1e1ee]">
                      {expandedItem === item.text ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  )}
                </ListItemButton>
              </ListItem>
              {item.subItems && (
                <Collapse in={expandedItem === item.text}>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem}
                        className="pl-16 pr-6 py-2 hover:bg-white/10"
                      >
                        <ListItemText 
                          primary={subItem}
                          className="font-arial text-[14px] font-normal"
                          primaryTypographyProps={{
                            style: { color: '#d1e1ee' }
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Social Media Links */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 py-4">
          <div className="px-6">
            <p className="text-[#d1e1ee]/70 text-sm mb-3 font-arial">Follow us</p>
            <div className="flex justify-between">
              {socialIcons.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-white/10"
                  sx={{ color: '#d1e1ee' }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;