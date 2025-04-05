import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Finance and Operations Intern",
      company: "A4TE",
      location: "New York, New York",
      date: "September 2024 - Present",
      responsibilities: [
        "Managing vendor relationships and pro-bono partnerships with over 80 law firms, measured by $12.35M in in-kind contributions",
        "Assisting with fund accounting and reconciliation for assets over $2.0M while enhancing IT infrastructure"
      ]
    },
    {
      title: "Technical Solutions Specialist",
      company: "Restoration Chiropractic",
      location: "Savannah, Georgia",
      date: "May 2024 - August 2024",
      responsibilities: [
        "Implemented automated workflows for efficient communication and data processing",
        "Transitioned the team from Skype to Slack, improving internal communication efficiency"
      ]
    },
    {
      title: "IT Intern",
      company: "Blessed Sacrament Catholic School",
      location: "Savannah, Georgia",
      date: "May 2024 - July 2024",
      responsibilities: [
        "Managed and tracked 300+ devices, achieving 100% inventory accuracy through streamlined processes",
        "Configured and updated 50+ devices while reducing classroom tech issues through proactive support"
      ]
    },
    {
      title: "Website Maintainer",
      company: "BUGS @ NYU",
      location: "New York, New York",
      date: "January 2024 - Present",
      responsibilities: [
        "Maintaining and updating the organization's website to ensure functionality and accessibility"
      ]
    },
    {
      title: "Mathematics Tutor",
      company: "America Reads*America Counts",
      location: "New York City Metropolitan Area",
      date: "September 2023 - April 2024",
      responsibilities: [
        "Tutored 60+ students through individual and group sessions, helping to improve test scores by 5%"
      ]
    }
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