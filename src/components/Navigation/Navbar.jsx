import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '@context/LanguageContext';
import { useDrawer } from '@context/DrawerContext';
import mfpLogo from '@assets/images/logo-removebg-preview.png';
import clsx from 'clsx';

const Navbar = () => {
  const { isOpen, toggleDrawer } = useDrawer();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const handleLanguageChange = (lang) => {
    toggleLanguage(lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    navigate(`/${lang}`);
  };

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // Base navbar classes - improved shadow and border contrast
  const navClasses = clsx(
    'fixed top-0 left-0 right-0 z-[1000] h-[72px] border-b transition-all duration-300 ease-in-out',
    scrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-md border-gray-300' 
      : 'bg-white border-transparent'
  );

  // Logo classes based on scroll state
  const logoClasses = clsx(
    'h-auto object-contain transition-all duration-300 ease-in-out',
    scrolled ? 'max-h-10' : 'max-h-12'
  );

  // Improved button styles with better contrast and accessibility
  const langButtonBase = 'px-3 py-1.5 font-medium border-none cursor-pointer text-sm rounded-md transition-all duration-200 ease-in-out';
  
  // Active language button with deeper blue for better contrast
  const langButtonActive = 'bg-blue-800 text-white shadow-sm'; 
  
  // Inactive with clearer hover state and better contrast
  const langButtonInactive = 'text-blue-800 hover:bg-blue-100 hover:text-blue-900'; 

  return (
    <nav className={navClasses}>
      <div className="max-w-[1400px] h-full mx-auto px-4 md:px-6 flex items-center justify-between py-2">
        {/* Left Section */}
        <div className="flex items-center gap-2 rtl:order-3">
          <IconButton 
            onClick={toggleDrawer}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="!text-blue-800 !p-2 !rounded-lg hover:!bg-blue-100 !transition-all !duration-200" 
          >
            {isOpen ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
          </IconButton>
        </div>

        {/* Center Logo */}
        <Link to={`/${language}`} className="flex-1 flex justify-center rtl:order-2">
          <img 
            src={mfpLogo}
            alt="MFP 24/7 NEWS" 
            className={logoClasses}
          />
        </Link>

        {/* Right Section - Language Switcher */}
        <div className="flex items-center gap-4 rtl:order-1">
          <div className={clsx(
            "flex items-center gap-1 p-1 rounded-lg bg-gray-100",
            language === 'ur' ? "font-ur" : ""
          )}>
            <button 
              onClick={() => handleLanguageChange('ur')}
              className={clsx(
                langButtonBase, 
                language === 'ur' ? langButtonActive : langButtonInactive,
                "rtl:font-ur rtl:text-base"
              )}
            >
              اردو
            </button>
            <button 
              onClick={() => handleLanguageChange('en')}
              className={clsx(
                langButtonBase, 
                language === 'en' ? langButtonActive : langButtonInactive
              )}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;