import React from "react";
import { Outlet } from "react-router-dom";
import { DrawerProvider } from "@context/DrawerContext";
import ErrorBoundary from "@components/ErrorBoundary";
import Navbar from "@components/Navigation/Navbar";
import Footer from "@components/Shared/Footer";

const RootLayout = () => {
  return (
    <DrawerProvider>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4">
            <Outlet />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </DrawerProvider>
  );
};

export default RootLayout;
