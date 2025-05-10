import React, { useState } from 'react'; // Added useState
import { Link, useLocation } from 'react-router-dom';
import { IconButton, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useDrawer } from '@context/DrawerContext';
import CustomImage from '@components/Shared/CustomImage';
import SearchModal from '@components/Shared/SearchModal'; // Added SearchModal import
import mfpLogo from '@assets/images/logo-removebg-preview.png';
import clsx from 'clsx';

const Navbar = () => {
  const { isOpen, toggleDrawer } = useDrawer();
  const location = useLocation();
  const [searchModalOpen, setSearchModalOpen] = useState(false); // State for search modal

  const toggleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const navClasses = clsx(
    'fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300 ease-in-out',
    scrolled
      ? 'bg-white/95 backdrop-blur-md shadow-md border-gray-300'
      : 'bg-white border-transparent'
  );

  const logoClasses = clsx(
    'h-auto object-contain transition-all duration-300 ease-in-out',
    scrolled ? 'max-h-10' : 'max-h-12' // Adjusted for potentially smaller space
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-[1400px] mx-auto flex flex-col items-center w-full px-4 md:px-6 py-2 relative"> {/* Changed to flex-col, items-center, py-2, and added relative */}
        {/* Mobile Menu Button - Top Left (Absolute Positioned) */}
        <IconButton
          onClick={toggleDrawer}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="!absolute !top-1/2 !-translate-y-1/2 !left-4 !text-blue-800 !rounded-lg hover:!bg-blue-100 !transition-all !duration-200 md:hidden" // Adjusted positioning
        >
          {isOpen ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
        </IconButton>

        {/* Logo - Centered */}
        <div className="mb-1 mt-1"> {/* Adjusted margin for logo */}
          <Link to="/">
            <CustomImage
              src={mfpLogo}
              alt="MFP 24/7 NEWS"
              className={logoClasses}
            />
          </Link>
        </div>

        {/* Navigation Links (desktop) - Centered below logo */}
        <div className="hidden md:flex items-center gap-x-8">
          <Link to="#" title="Coming Soon" className="text-gray-800 animated-underline transition-all duration-200 font-bold">
            سیاسی خبریں
          </Link>
          <Link to="#" title="Coming Soon" className="text-gray-800 animated-underline transition-all duration-200 font-bold">
            کھیل خبریں
          </Link>
          <Link to="#" title="Coming Soon" className="text-gray-800 animated-underline transition-all duration-200 font-bold">
            عالمی خبریں
          </Link>
        </div>

        {/* Search Icon - Top Right (Absolute Positioned) */}
        <div className="!absolute !top-1/2 !-translate-y-1/2 !right-4 flex items-center"> {/* Adjusted positioning */}
          <IconButton
            onClick={toggleSearchModal} // Changed to open modal
            title="Search News"
            aria-label="Search news"
            className="!text-blue-800 !rounded-lg hover:!bg-blue-100 !transition-all !duration-200"
          >
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <SearchModal open={searchModalOpen} onClose={toggleSearchModal} /> {/* Added SearchModal instance */}
    </nav>
  );
};

export default Navbar;
