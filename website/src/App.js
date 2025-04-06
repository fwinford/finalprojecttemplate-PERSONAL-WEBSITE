import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ExperiencePage from './components/pages/ExperiencePage';
import { fairyDustCursor } from 'cursor-effects';

const App = () => {
  useEffect(() => {
    // Initialize the fairy dust cursor effect when the component mounts
    const cursorEffect = new fairyDustCursor({
      colors: [
        'rgba(255, 158, 177, 0.8)', // Pink
        'rgba(179, 212, 255, 0.8)', // Blue
        'rgba(187, 255, 203, 0.8)', // Light green
        'rgba(255, 223, 165, 0.8)', // Peach
        'rgba(209, 178, 255, 0.8)'  // Lavender
      ], // Colors that match your star cursor
    });
    
    // Clean up the effect when the component unmounts
    return () => {
      cursorEffect.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
