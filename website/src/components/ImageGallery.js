import React, { useState, useCallback, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import portraitImg from '../assets/private/portrait.jpg';
import volunteeringImg from '../assets/private/volunteering.jpeg';
import beachImg from '../assets/private/beach.jpg';
import colorstackImg from '../assets/private/colorstack.jpg';

const ImageGallery = ({ onImageChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
  
  // Gallery data
  const galleryItems = useMemo(() => ([
    {
      mainImage: portraitImg,
      location: "Silicon Valley, CA",
      caption: "I've lived around the world: Australia, Mexico, Canada, Georgia, Texas, New York, Maryland, Trinidad"
    },
    {
      mainImage: volunteeringImg,
      location: "New Orleans, Louisiana",
      caption: "I’ve spent my spring breaks volunteering in New Orleans and New York."
    },
    {
      mainImage: beachImg,
      location: "Trinidad and Tobago",
      caption: "Why see the world, when you've got the beach - Frank Ocean"
    },
    {
      mainImage: colorstackImg,
      location: "Chicago, Illinois",
      caption: "Ask me on LinkedIn about ColorStack"
    }
  ]), []);

  // Navigate to next image
  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % galleryItems.length;
    setActiveIndex(nextIndex);
    if (onImageChange) {
      onImageChange(galleryItems[nextIndex].caption);
    }
  }, [activeIndex, galleryItems, onImageChange]);

  // Navigate to previous image
  const goToPrev = useCallback(() => {
    const prevIndex = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    if (onImageChange) {
      onImageChange(galleryItems[prevIndex].caption);
    }
  }, [activeIndex, galleryItems, onImageChange]);

  // Handle navigation dot click
  const handleDotClick = useCallback((index) => {
    setActiveIndex(index);
    if (onImageChange) {
      onImageChange(galleryItems[index].caption);
    }
  }, [galleryItems, onImageChange]);

  // Add keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);
  
  // Add entry animation when component mounts
  useEffect(() => {
    // Short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (galleryRef.current) {
        galleryRef.current.classList.add('animate-in');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Notify parent of initial caption on mount
  useLayoutEffect(() => {
    if (onImageChange && galleryItems.length > 0) {
      onImageChange(galleryItems[activeIndex].caption);
    }
  }, [activeIndex, onImageChange, galleryItems]);

  return (
    <div className="personal-gallery" ref={galleryRef}>
      <div className="gallery-image-container">
        {galleryItems.map((item, index) => (
          <div 
            key={index}
            className={`gallery-image-wrapper ${index === activeIndex ? 'active' : ''}`}
            style={{ 
              opacity: index === activeIndex ? 1 : 0,
              position: index === activeIndex ? 'relative' : 'absolute',
              display: index === activeIndex ? 'block' : 'none'
            }}
          >
            <img 
              src={item.mainImage} 
              alt={`Journey moment in ${item.location}`}
              className="gallery-image"
            />
            <div className="location-badge">
              {item.location}
            </div>
          </div>
        ))}
        
        {/* Arrow navigation */}
        <button 
          className="gallery-arrow gallery-arrow-left" 
          onClick={goToPrev} 
          aria-label="Previous image"
          type="button"
        >
          &#10094;
        </button>
        <button 
          className="gallery-arrow gallery-arrow-right" 
          onClick={goToNext} 
          aria-label="Next image"
          type="button"
        >
          &#10095;
        </button>
      </div>
      
      {/* Navigation dots */}
      <div className="gallery-navigation" role="tablist">
        {galleryItems.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`View image ${index + 1}`}
            aria-selected={index === activeIndex}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;