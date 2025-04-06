import React, { useEffect, useRef } from 'react';

const Updates = ({ hideTitle = false }) => {
  const updatesRef = useRef(null);
  const updateItemsRef = useRef([]);
  
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

  // Set up intersection observer for scroll animations
  useEffect(() => {
    // Capture current values of refs at the time the effect runs
    const updatesElement = updatesRef.current;
    const updateItems = [...updateItemsRef.current];
    
    // Observer for the entire updates section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer for individual update items with staggered animation
    const itemsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add a slight delay based on the item's position for a staggered effect
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 150); // 150ms delay between each item
            itemsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe the main section
    if (updatesElement) {
      sectionObserver.observe(updatesElement);
    }

    // Observe each update item
    updateItems.forEach((item) => {
      if (item) {
        itemsObserver.observe(item);
      }
    });

    // Cleanup function uses the captured values, not the ref values directly
    return () => {
      if (updatesElement) {
        sectionObserver.unobserve(updatesElement);
      }
      updateItems.forEach((item) => {
        if (item) {
          itemsObserver.unobserve(item);
        }
      });
    };
  }, []); // Empty dependency array means this only runs once

  return (
    <section className="updates-section" ref={updatesRef}>
      {!hideTitle && <h2 className="animate-on-scroll">Updates</h2>}
      <div className="updates-content">
        {updates.map((update, index) => (
          <div 
            key={index} 
            className="update-item cd-timeline-block"
            ref={el => updateItemsRef.current[index] = el}
          >
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