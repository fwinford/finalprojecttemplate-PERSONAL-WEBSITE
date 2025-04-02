import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Headstart",
      location: "San Francisco, CA",
      date: "March 2024 - Present",
      description: "Working on innovative solutions for education technology",
      technologies: ["React", "Node.js", "TypeScript", "AWS"],
      responsibilities: [
        "Developing full-stack applications using modern technologies",
        "Collaborating with cross-functional teams",
        "Implementing new features and improving existing ones"
      ]
    },
    // Add more experiences as needed
  ];

  return (
    <section className="experience-section">
      <h2>Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item cd-timeline-block">
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
              <p>{exp.description}</p>
              <ul className="content-skills">
                {exp.technologies.map((tech, techIndex) => (
                  <li key={techIndex}>{tech}</li>
                ))}
              </ul>
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