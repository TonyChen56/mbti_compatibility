import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { CompatibilityProvider } from './context/CompatibilityContext';
import Home from './pages/Home';
import About from './pages/About';
import CompatibilityPage from './pages/CompatibilityPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <CompatibilityProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/compatibility/:type1/:type2" element={<CompatibilityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CompatibilityProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;