import React from 'react';
import Navbar from './Navbar';
import GlobalLoaderOverlay from '../UI/GlobalLoaderOverlay';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <GlobalLoaderOverlay />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;