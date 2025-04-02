import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ExperiencePage from './components/pages/ExperiencePage';

const App = () => {
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
