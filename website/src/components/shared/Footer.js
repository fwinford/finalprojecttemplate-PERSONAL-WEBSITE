// src/components/Footer.js
import React from 'react';
import socialLinks from '../../data/socialLinks';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="connect-section">
          <h2>Let's Connect</h2>
          <p>I'm always excited to collaborate and connect with new people!</p>
          
          <div className="social-links">
            {socialLinks.map(link => (
              <a 
                key={link.id}
                href={link.url} 
                className="social-link"
                target={link.url.startsWith('http') ? "_blank" : undefined}
                rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                aria-label={link.ariaLabel}
              >
                <link.icon className="social-icon" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="copyright">
          <p>&copy; 2025 Faith Winford. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;