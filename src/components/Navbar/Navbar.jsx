import React from 'react';
import { IconButton, Box, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = ({ onDrawerToggle, isDrawerOpen }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 
      ${trigger ? 'py-2 bg-white/95 backdrop-blur-md shadow-md' : 'py-4 bg-white'}`}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* Left - Hamburg Menu and Search */}
        <div className="flex items-center">
          <IconButton 
            onClick={onDrawerToggle}
            className="transition-all duration-200 hover:bg-gray-100"
            size="large"
            sx={{ ml: '-12px' }}
          >
            {isDrawerOpen ? 
              <CloseIcon className="transform transition-transform duration-200" /> : 
              <MenuIcon className="transform transition-transform duration-200" />
            }
          </IconButton>
          <div className="h-5 w-px bg-gray-200 mx-2"/>
          <IconButton className="hover:bg-gray-100">
            <SearchIcon />
          </IconButton>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <img 
            src="https://www.voanews.com/Content/responsive/VOA/en-US/img/logo.svg" 
            alt="VOA Logo" 
            className="h-9 object-contain transition-all duration-300"
          />
        </div>

        {/* Right - Media Icons */}
        <Box className="flex items-center">
          <IconButton className="hover:bg-gray-100">
            <TranslateIcon />
          </IconButton>
          <div className="h-5 w-px bg-gray-200 mx-2"/>
          <IconButton className="hover:bg-gray-100">
            <VideocamIcon />
          </IconButton>
          <div className="h-5 w-px bg-gray-200 mx-2"/>
          <IconButton className="hover:bg-gray-100">
            <VolumeUpIcon />
          </IconButton>
        </Box>
      </div>
    </nav>
  );
};

export default NavBar;
