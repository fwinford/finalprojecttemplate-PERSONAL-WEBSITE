import React from 'react';

const Updates = () => {
  const updates = [
    {
      title: "Started New Role at Headstart",
      date: "March 2024",
      description: "Excited to announce my new position as a Software Engineer at Headstart!"
    },
    // Add more updates as needed
  ];

  return (
    <section className="updates-section">
      <h2>Updates</h2>
      <div className="updates-content">
        {updates.map((update, index) => (
          <div key={index} className="update-item">
            <h3>{update.title}</h3>
            <span className="update-date">{update.date}</span>
            <p>{update.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Updates; 