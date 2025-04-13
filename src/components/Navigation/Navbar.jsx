import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Box, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SearchIcon from '@mui/icons-material/Search';
import { useLanguage } from '@context/LanguageContext';
import './Navbar.css';

const Navbar = ({ onDrawerToggle, isDrawerOpen }) => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const handleLanguageChange = (lang) => {
    toggleLanguage(lang);
    navigate(`/${lang}`);
  };

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left Section */}
        <div className="navbar-left">
          <IconButton 
            onClick={onDrawerToggle}
            className="nav-icon-button"
          >
            {isDrawerOpen ? 
              <CloseIcon /> : 
              <MenuIcon />
            }
          </IconButton>
          <div className="divider" />
          <IconButton className="nav-icon-button">
            <SearchIcon />
          </IconButton>
        </div>

        {/* Center Logo */}
        <Link to={`/${language}`} className="navbar-center">
          <img 
            src="https://www.voanews.com/Content/responsive/VOA/en-US/img/logo.svg" 
            alt="VOA Logo" 
            className="navbar-logo"
          />
        </Link>

        {/* Right Section */}
        <div className="navbar-right">
          <div className="language-select">
            <button 
              onClick={() => handleLanguageChange('en')}
              className={`language-link ${language === 'en' ? 'active' : ''}`}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageChange('ur')}
              className={`language-link ${language === 'ur' ? 'active' : ''}`}
            >
              اردو
            </button>
          </div>
          <IconButton className="nav-icon-button">
            <TranslateIcon />
          </IconButton>
          <div className="divider" />
          <IconButton className="nav-icon-button">
            <VideocamIcon />
          </IconButton>
          <div className="divider" />
          <IconButton className="nav-icon-button">
            <VolumeUpIcon />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
