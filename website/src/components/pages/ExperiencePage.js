import React, { useEffect, useRef } from 'react';
import { getAllExperiences } from '../../data/ExperienceData';
import projectData from '../../data/ProjectsData';
import '../../styles/page-styles/experience-page.css';
import Footer from '../shared/Footer';

const experiences = getAllExperiences();

const Experience = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px' });

    const items = timelineRef.current?.querySelectorAll('.experience-item') || [];
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="full-page-section">
      <div className="experience-container">
        <h2 className="experience-header">My Experience</h2>

        <section className="projects-section">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projectData.map((project) => (
              <div className="project-card" key={project.id}>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img src={project.image} alt={project.title} className="project-image" />
                </a>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.stack && (
                    <div className="project-tags">
                      {project.stack.map((tech, index) => (
                        <span className="project-tag" key={index}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="cd-timeline" ref={timelineRef}>
          {experiences.map((item) => (
            <div className="cd-timeline-block experience-item" key={item.id}>
              <div className="cd-timeline-img experience-dot"></div>
              <div className="cd-timeline-content">
                <h3>{item.title} @ {item.company}</h3>
                <div className="meta-info">
                  <span className="timeline-date">{item.date}</span>
                  <span>{item.location}</span>
                </div>
                <p>{item.description}</p>
                <ul className="responsibilities">
                  {item.responsibilities.map((res, index) => (
                    <li key={index}>{res}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Experience;