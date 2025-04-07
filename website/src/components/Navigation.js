// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/fcw-initial.png';
import socialLinks from '../data/socialLinks';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="home-link">
          <img src={logo} alt="FCW Logo" />
          <div className="name-container">
            <span>Faith Winford</span>
          </div>
        </Link>
        
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/experience" className="nav-link">Experience</Link>
          </div>
          
          <div className="social-nav-links">
            {socialLinks.map(link => (
              <a 
                key={link.id}
                href={link.url} 
                className="social-nav-link"
                target={link.url.startsWith('http') ? "_blank" : undefined}
                rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                aria-label={link.ariaLabel}
              >
                <link.icon className="social-nav-icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;