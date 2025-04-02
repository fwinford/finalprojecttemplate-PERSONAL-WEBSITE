import React from 'react';
import ImageCarousel from '../shared/ImageCarousel';

const AboutPage = () => {
  return (
    <div className="full-page-section">
      <div className="about-page">
        <h1>About Me</h1>
        <div className="about-content">
          <section className="about-carousel">
            <ImageCarousel />
          </section>

          <section className="about-details">
            <div className="journey-container">
              <div className="journey-text">
                <h2>My Journey</h2>
                <div className="journey-stats">
                  <div className="stat-item">
                    <h3>Rejections</h3>
                    <span className="stat-number">150+</span>
                  </div>
                  <div className="stat-item">
                    <h3>Acceptances</h3>
                    <span className="stat-number">10+</span>
                  </div>
                </div>
              </div>
              <p>Share your journey into tech, your interests, and what drives you...</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 