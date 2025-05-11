import React from "react";
import { Outlet, Link } from "react-router-dom"; // Added Link
import { DrawerProvider } from "@context/DrawerContext";
import ErrorBoundary from "@components/ErrorBoundary";
import Navbar from "@components/Navigation/Navbar";
import Footer from "@components/Shared/Footer";
import { IconButton } from "@mui/material"; // Added IconButton
import HomeIcon from "@mui/icons-material/Home"; // Added HomeIcon

const RootLayout = () => {
  return (
    <DrawerProvider>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Outlet />
        </div>
        {/* Go to Home Button */}
        <Link
          to="/"
          aria-label="Go to home page"
          className="fixed bottom-5 right-5 z-50"
        >
          <IconButton
            color="primary"
            aria-label="Go to home page"
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !p-3 !rounded-full !shadow-lg"
          >
            <HomeIcon fontSize="medium" />
          </IconButton>
        </Link>
      </ErrorBoundary>
    </DrawerProvider>
  );
};

export default RootLayout;
