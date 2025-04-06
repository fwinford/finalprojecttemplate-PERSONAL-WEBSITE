import React, { useEffect, useRef } from 'react';
import { getAllUpdates } from './UpdatesData';

const Updates = ({ hideTitle = false }) => {
  const updatesRef = useRef(null);
  const updateItemsRef = useRef([]);
  
  // Get updates from the separate data file and reverse the order (newest first)
  const updates = [...getAllUpdates()].reverse();

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
      {!hideTitle && <h2 className="animate-on-scroll">RECENT MILESTONES</h2>}
      <div className="cd-timeline">
        {/* Add explicit timeline line */}
        <div className="timeline-line"></div>
        
        {updates.map((update, index) => (
          <div 
            key={update.id} 
            className="update-item cd-timeline-block"
            ref={el => updateItemsRef.current[index] = el}
          >
            <div className="cd-timeline-img"></div>
            <div className="cd-timeline-content">
              <h3>{update.title}</h3>
              <div className="meta-info">
                <span className="timeline-date">
                  <i className="far fa-calendar"></i>
                  {update.date}
                </span>
                {update.linkedinUrl && (
                  <a href={update.linkedinUrl} className="linkedin-icon" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
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