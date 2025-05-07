import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CompatibilityProvider } from './context/CompatibilityContext';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <LanguageProvider>
      <CompatibilityProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </CompatibilityProvider>
    </LanguageProvider>
  );
}

export default App;