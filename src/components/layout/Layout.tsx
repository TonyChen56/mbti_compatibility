import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from '../navigation/Breadcrumbs';
import SecurityHeaders from '../seo/SecurityHeaders';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBreadcrumbs = true }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen">
      <SecurityHeaders />
      <Header />
      <main className="flex-grow">
        {showBreadcrumbs && !isHomePage && (
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;