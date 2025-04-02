import React from 'react';

const Updates = () => {
  const updates = [
    {
      title: "Started New Role at Headstart",
      date: "March 2024",
      description: "Excited to announce my new position as a Software Engineer at Headstart!",
      linkedinUrl: "https://linkedin.com/in/yourprofile/posts/123456789"
    },
    {
      title: "Completed Advanced Web Development Course",
      date: "February 2024",
      description: "Just finished an intensive course on modern web development technologies.",
      linkedinUrl: "https://linkedin.com/in/yourprofile/posts/123456788"
    },
    // Add more updates as needed
  ];

  return (
    <section className="updates-section">
      <h2>Updates</h2>
      <div className="updates-content">
        {updates.map((update, index) => (
          <div key={index} className="update-item cd-timeline-block">
            <div className="cd-timeline-img"></div>
            <div className="cd-timeline-content">
              <div className="update-header">
                <h3>{update.title}</h3>
                <a href={update.linkedinUrl} className="linkedin-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="timeline-content-info">
                <span className="timeline-content-info-date">
                  <i className="far fa-calendar"></i>
                  {update.date}
                </span>
              </div>
              <p>{update.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Updates;