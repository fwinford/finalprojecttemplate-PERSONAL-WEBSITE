import React from 'react';
import ImageCarousel from '../shared/ImageCarousel';

const AboutPage = () => {
  const projects = [
    {
      title: "Personal Portfolio",
      description: "A modern portfolio website built with React and modern web technologies",
      image: "path/to/portfolio-image.jpg",
      tags: ["React", "CSS", "JavaScript"]
    },
    {
      title: "Project 2",
      description: "Description of your second project",
      image: "path/to/project2-image.jpg",
      tags: ["Node.js", "Express", "MongoDB"]
    },
    // Add more projects as needed
  ];

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
                  <div className="stat-item rejections">
                    <h3>Rejections</h3>
                    <span className="stat-number">150+</span>
                  </div>
                  <div className="stat-item acceptances">
                    <h3>Acceptances</h3>
                    <span className="stat-number">10+</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="updates-section">
            <h2>Updates</h2>
            {/* Your updates content here */}
          </section>

          <section className="projects-section">
            <h2>Featured Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-skills">
            <h2>Skills & Expertise</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React</li>
                  <li>JavaScript</li>
                  <li>HTML/CSS</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>SQL</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-interests">
            <h2>Beyond Coding</h2>
            <p>Share your interests, hobbies, or anything else you'd like people to know about you...</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 