import React, { useState, useEffect, useRef } from 'react';
import ImageGallery from '../ImageGallery';
import Updates from '../shared/Updates';
import Footer from '../shared/Footer';

const AboutPage = () => {
  // State to hold the current image caption
  const [currentCaption, setCurrentCaption] = useState(
    "I built my first web app here with no sleep and too much coffee. The energy of working alongside other passionate developers pushed me to learn faster than I thought possible."
  );
  
  // State to track if elements are visible
  const [transitionVisible, setTransitionVisible] = useState(false);
  
  // Refs for animated elements
  const textColumnRef = useRef(null);
  const narrativeRef = useRef(null);
  
  // Handler for when an image is selected
  const handleImageChange = (caption) => {
    // First fade out
    if (narrativeRef.current) {
      narrativeRef.current.classList.remove('animate-in');
      
      // After a short delay, update text and fade in
      setTimeout(() => {
        setCurrentCaption(caption);
        
        // Wait for next render cycle to add class back
        setTimeout(() => {
          if (narrativeRef.current) {
            narrativeRef.current.classList.add('animate-in');
          }
        }, 50);
      }, 300);
    } else {
      // Fallback if ref not available
      setCurrentCaption(caption);
    }
  };
  
  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animation class based on the element
            if (entry.target.classList.contains('section-transition')) {
              setTransitionVisible(true);
            } else {
              entry.target.classList.add('animate-in');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe elements
    const elements = [
      textColumnRef.current,
      narrativeRef.current,
      document.querySelector('.section-transition')
    ];
    
    elements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  // Add animation to narrative on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (narrativeRef.current) {
        narrativeRef.current.classList.add('animate-in');
      }
    }, 800); // Delay after text column appears
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="full-page-section">
      <div className="about-container">
        <h1 className="about-heading">THE JOURNEY SO FAR</h1>
        
        <div className="about-content-wrapper">
          {/* Text Column */}
          <div className="about-text-column" ref={textColumnRef}>
            <div className="about-story">
              <p>
                As a HeadStart Fellowship fellow with a passion for software development and technology, 
                I've embarked on a journey that combines creativity with technical expertise. My path hasn't 
                been linear, but each step has contributed to my growth as a developer.
              </p>
              
              <blockquote className="personal-narrative" ref={narrativeRef}>
                {currentCaption}
              </blockquote>
              
              <p>
                My experience spans across various technologies and frameworks, allowing me to approach 
                problems from multiple angles. I believe in continuous learning and pushing boundaries 
                to create meaningful digital experiences.
              </p>
            </div>
          </div>
          
          {/* Image Gallery Column */}
          <div className="about-image-column">
            <ImageGallery onImageChange={handleImageChange} />
          </div>
        </div>
        
        {/* Journey to Updates Transition */}
        <div className={`section-transition ${transitionVisible ? 'visible' : ''}`}>
          <p className="transition-text">
            My journey continues to evolve with each new challenge and opportunity. Here's what I've been up to recently:
          </p>
          
          <div className="transition-visual">
            <div className="gradient-path"></div>
          </div>
          
          <h2 className="transition-heading">RECENT MILESTONES</h2>
        </div>
        
        {/* Updates Section - hiding the title since we have RECENT MILESTONES */}
        <div className="updates-section">
          <Updates hideTitle={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;