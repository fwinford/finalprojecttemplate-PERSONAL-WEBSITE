import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/fcw-initial.png';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="home-link">
          <img src={logo} alt="FCW Logo" />
        </Link>
        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/experience" className="nav-link">Experience</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 