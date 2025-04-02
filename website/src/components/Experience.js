import React from 'react';

const Experience = () => {
  return (
    <section className="experience-section">
      <h2>Experience</h2>
      <div className="timeline">
        <div className="timeline-item">
          <h3>Software Engineer</h3>
          <p className="company">Headstart</p>
          <p className="date">March 2024 - Present</p>
          <ul>
            <li>Working on innovative solutions for education technology</li>
            <li>Developing full-stack applications using modern technologies</li>
          </ul>
        </div>
        {/* Add more experience items as needed */}
      </div>
    </section>
  );
};

export default Experience; 