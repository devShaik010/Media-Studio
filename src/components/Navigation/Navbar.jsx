import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDrawer } from '@context/DrawerContext';
import mfpLogo from '@assets/images/logo-removebg-preview.png';
import clsx from 'clsx';

const Navbar = () => {
  const { isOpen, toggleDrawer } = useDrawer();
  const location = useLocation();

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

  return (
    <nav className={navClasses}>
      {/* Removed px-4 md:px-6 from this div */}
      <div className="max-w-[1400px] h-full mx-auto flex items-center justify-between py-2">
        {/* Left Section - Added pl-4 md:pl-6 */}
        <div className="flex items-center gap-2 pl-4 md:pl-6">
          <IconButton
            onClick={toggleDrawer}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="!text-blue-800 !rounded-lg hover:!bg-blue-100 !transition-all !duration-200"
          >
            {isOpen ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
          </IconButton>
        </div>

        {/* Center Logo - Added px-4 md:px-6 */}
        <Link to="/" className="flex-1 flex justify-center px-4 md:px-6">
          <img
            src={mfpLogo}
            alt="MFP 24/7 NEWS"
            className={logoClasses}
          />
        </Link>

        {/* Right Section - Placeholder or other elements if needed - Added pr-4 md:pr-6 */}
        <div className="flex items-center gap-4 pr-4 md:pr-6">
          {/* Language switcher removed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
