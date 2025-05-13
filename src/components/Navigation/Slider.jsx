import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Collapse, // Not used anymore
  IconButton,
  TextField, // For search bar
  InputAdornment // For search icon in TextField
} from '@mui/material';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'; // Not used
// import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'; // Not used
// import RadioOutlinedIcon from '@mui/icons-material/RadioOutlined'; // Not used
// import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'; // Not used
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'; // Not used
// import ExpandLess from '@mui/icons-material/ExpandLess'; // Not used
// import ExpandMore from '@mui/icons-material/ExpandMore'; // Not used
import CloseIcon from '@mui/icons-material/Close'; // Still used for overlay, but not prominent header
import SearchIcon from '@mui/icons-material/Search'; // For search bar
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// Removed FaXTwitter import as it's no longer used
import clsx from 'clsx';

// Define menu items (Urdu, based on image)
const menuItems = [
  { text: 'سروق', path: '/' },
  { text: 'تازه ترین خبریں', path: '/' },
  { text: 'تلنگانه', path: '/' },
  { text: 'حیدرآباد', path: '/' },
  { text: 'قومی خبریں', path: '/' },
  { text: 'جرائم و حادثات', path: '/' },
  { text: 'خاص خبر', path: '/' },
];

// Updated social icons based on image
const socialIcons = [
  { icon: <FacebookIcon />, link: 'https://www.facebook.com/share/12K9a8Ddonz/', label: 'Facebook' },
  { icon: <YouTubeIcon />, link: 'https://youtube.com/@faheemuddin9244?si=rLIouX7l3VOeJEEs', label: 'YouTube' },
  { icon: <InstagramIcon />, link: 'https://www.instagram.com/mediafocuspoint1?utm_source=qr&igsh=aTQ3N3gxem5lY3Rh', label: 'Instagram' }
];

const Slider = ({ open, onClose }) => {
  // const [expandedItem, setExpandedItem] = useState(null); // Not used anymore

  // const handleExpand = (text) => { // Not used anymore
  //   setExpandedItem(expandedItem === text ? null : text);
  // };

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

      {/* Slider Container - Changed to white background, LTR assumed for now, adjust if RTL specific needed */}
      <div
        className={clsx(
          'fixed top-0 bottom-0 w-72 md:w-80 bg-white z-[1300] shadow-xl flex flex-col transition-transform duration-300 ease-in-out', // Changed bg, adjusted width
          'transform',
          open ? 'translate-x-0' : '-translate-x-full',
          'left-0' // Assuming LTR, for RTL this would be 'right-0' and 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title" // Keep for accessibility, though title is visually hidden
      >
        {/* Optional: Close button at top right of drawer itself, if desired in addition to overlay click */}
        <div className="absolute top-2 right-2">
            <IconButton onClick={onClose} aria-label="Close menu" className="!text-gray-500 hover:!text-gray-800">
                <CloseIcon />
            </IconButton>
        </div>
        <h2 id="drawer-title" className="sr-only">Navigation Menu</h2>

        {/* Content Area */}
        <div className="p-4 flex flex-col h-full">
          {/* Search Bar */}
          <div className="mb-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-gray-400" />
                  </InputAdornment>
                ),
                style: { direction: 'ltr' } // Keep search input LTR for typical search behavior
              }}
              inputProps={{ style: { textAlign: 'left' } }} // Text inside input LTR
              className="bg-gray-50" // Light background for search
            />
          </div>

          {/* Menu Items List - Vertical, Urdu text, right-aligned */}
          <List className="flex-grow overflow-y-auto">
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    // Navigate or perform action then close
                    onClose();
                  }}
                  className={clsx(
                    'py-2 px-1 text-gray-700 hover:bg-gray-100 transition-all duration-150 ease-in-out w-full',
                    // Active state styling (optional, can be adapted)
                    window.location.pathname === item.path
                      ? 'bg-gray-100 font-semibold'
                      : 'font-normal'
                  )}
                  component={Link}
                  to={item.path}
                  sx={{ justifyContent: 'flex-end' }} // Align text to the right for Urdu
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ 
                      className: 'text-right text-md', // Ensure text is right aligned
                      style: { fontFamily: 'Arial, sans-serif' } // Specify a font that supports Urdu well if needed
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Footer with Social Icons and Copyright */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="flex justify-center gap-x-5 mb-4">
              {socialIcons.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label}`} // Simpler label
                  className="!text-gray-600 hover:!text-blue-600" // Adjusted colors
                  size="medium"
                >
                  {/* Ensure icon components are correctly passed */}
                  {React.cloneElement(social.icon, { fontSize: 'medium' })}
                </IconButton>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center pb-2">
              © 2025 Media Studio. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
