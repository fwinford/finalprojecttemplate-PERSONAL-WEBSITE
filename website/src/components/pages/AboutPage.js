import React, { useState, useEffect, useRef } from 'react';
import ImageGallery from '../ImageGallery';
import Updates from '../shared/Updates';
import Footer from '../shared/Footer';

const AboutPage = () => {
  // State to hold the current image caption
  const [currentCaption, setCurrentCaption] = useState(
    ""
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
      
      <h2 className="section-title">A Little Bit About Me</h2>
      <div className="about-container">
        
        <div className="about-content-wrapper">
          {/* Text Column */}
          <div className="about-text-column" ref={textColumnRef}>
            <div className="about-story">
              <p>
              I'm a developer, student, and forever-in-progress problem solver.
               I'm currently studying computer science and philosophy at NYU — which basically means I build things and question everything. <br />
               I'm big on learning and using tech to help make people's lives easier — I like tech that has real impact. 
               I've interned at nonprofits, schools, and banks where I've gotten to do just that.
              </p>
              
              <blockquote className="personal-narrative" ref={narrativeRef}>
                {currentCaption}
              </blockquote>
              
              <p>
              Outside of coding, I'm someone who really values community and advocacy. <br />
               I've stayed up way too late organizing files for friends, and love finding joy in small things — like a good playlist or a solid thrift find.
                You can usually catch me building something, helping someone, or making a new Notion template I probably didn't need.
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
          <div className="transition-visual">
            <div className="gradient-path"></div>
            <div className="connector-dots">
              <div className="connector-dot"></div>
              <div className="connector-dot"></div>
              <div className="connector-dot"></div>
              <div className="connector-dot"></div>
              <div className="connector-dot"></div>
            </div>
          </div>
          
          <h2 className="transition-heading">MileStones</h2>
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