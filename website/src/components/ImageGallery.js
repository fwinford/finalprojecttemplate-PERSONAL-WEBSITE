import React, { useState, useCallback, useEffect, useRef } from 'react';

// Image paths - based on your file structure
const imagePaths = [
  require('../assets/private/volunteering.jpeg'),
  require('../assets/private/image2.jpg'),
  require('../assets/private/image3.jpg'),
  require('../assets/private/image4.jpg')
];

const ImageGallery = ({ onImageChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
  
  // Gallery data
  const galleryItems = [
    {
      mainImage: imagePaths[0],
      location: "New Orleans, Louisianna",
      caption: "I’ve spent my spring breaks volunteering in New Orleans and New York."
    },
    {
      mainImage: imagePaths[1],
      location: "Trinidad and Tobago 🇹🇹",
      caption: "And I'm from Trinidad and Tobago 🇹🇹. My cultural background has given me a unique perspective on problem-solving and connecting with diverse teams."
    },
    {
      mainImage: imagePaths[2],
      location: "Conference, NY",
      caption: "Attending tech conferences broadened my understanding of emerging frameworks and industry best practices. I love connecting with others in the field."
    },
    {
      mainImage: imagePaths[3],
      location: "Community Event, Chicago",
      caption: "Because tech isn't all I do—I care about justice too. I volunteer with organizations that use technology to address social challenges and create positive change."
    }
  ];

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
  useEffect(() => {
    if (onImageChange && galleryItems.length > 0) {
      onImageChange(galleryItems[0].caption);
    }
  }, [onImageChange, galleryItems]);

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
              zIndex: index === activeIndex ? 2 : 1
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