import React from 'react';
import Experience from '../shared/Experience';

const ExperiencePage = () => {
  return (
    <div className="full-page-section">
      <div className="experience-page">
        <h1>My Experience</h1>
        
        <section className="experience-intro">
          <p>Here's a comprehensive look at my professional journey and the skills I've developed along the way.</p>
        </section>

        <section className="experience-timeline">
          <Experience />
        </section>

        <section className="experience-highlights">
          <h2>Key Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <h3>Headstart Fellowship</h3>
              <p>Highlight your major accomplishments and contributions...</p>
            </div>
            <div className="achievement-card">
              <h3>Microsoft Internship</h3>
              <p>Describe your key projects and their impact...</p>
            </div>
          </div>
        </section>

        <section className="technical-expertise">
          <h2>Technical Expertise</h2>
          <div className="expertise-areas">
            <div className="expertise-area">
              <h3>Web Development</h3>
              <p>Detail your expertise in web development...</p>
            </div>
            <div className="expertise-area">
              <h3>Cloud Technologies</h3>
              <p>Describe your experience with cloud platforms...</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExperiencePage; 