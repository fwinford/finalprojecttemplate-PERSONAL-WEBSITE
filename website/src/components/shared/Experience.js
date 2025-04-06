import React from 'react';
import { getAllExperiences } from './ExperienceData';

const Experience = () => {
  const experiences = getAllExperiences();

  return (
    <section className="experience-section">
      <h2>Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="timeline-item cd-timeline-block">
            <div className="cd-timeline-img"></div>
            <div className="cd-timeline-content">
              <h3>{exp.title}</h3>
              <div className="timeline-content-info">
                <span className="timeline-content-info-title">
                  <i className="fas fa-building"></i>
                  {exp.company}
                </span>
                <span className="timeline-content-info-date">
                  <i className="far fa-calendar"></i>
                  {exp.date}
                </span>
                <span className="timeline-content-info-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {exp.location}
                </span>
              </div>
              <ul className="responsibilities">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;