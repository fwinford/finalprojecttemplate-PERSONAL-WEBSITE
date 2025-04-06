import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Import a placeholder image we know will work
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x400?text=Loading';

const ImageCarousel = () => {
  const swiperRef = useRef(null);
  const [imageStatuses, setImageStatuses] = useState({});
  const [debugInfo, setDebugInfo] = useState(null);

  // Try multiple approaches to load images
  const attemptLoadImage = async (path, index) => {
    // Method 1: Direct import with dynamic require (may work depending on your webpack config)
    try {
      const importedImage = require(`../../assets/private/${path}`);
      console.log(`Method 1 success for image ${index}:`, importedImage);
      return importedImage;
    } catch (e) {
      console.log(`Method 1 failed for image ${index}:`, e.message);
    }
    
    // Method 2: Try with public URL
    try {
      const publicPath = `${process.env.PUBLIC_URL}/assets/private/${path}`;
      // Test if the image exists
      const response = await fetch(publicPath, { method: 'HEAD' });
      if (response.ok) {
        console.log(`Method 2 success for image ${index}:`, publicPath);
        return publicPath;
      }
      console.log(`Method 2 failed for image ${index}: Image not found at ${publicPath}`);
    } catch (e) {
      console.log(`Method 2 failed for image ${index}:`, e.message);
    }
    
    // Method 3: Try relative path
    const relativePath = `./assets/private/${path}`;
    console.log(`Trying Method 3 for image ${index}:`, relativePath);
    return relativePath;
  };

  useEffect(() => {
    // Gather debug info about the environment
    setDebugInfo({
      publicUrl: process.env.PUBLIC_URL,
      nodeEnv: process.env.NODE_ENV,
      baseUrl: window.location.origin,
      currentPath: window.location.pathname,
    });
    
    // Log all image-related resources on the page for debugging
    const imageElements = document.querySelectorAll('img');
    console.log('All image elements on page:', imageElements.length);
    imageElements.forEach((img, i) => {
      console.log(`Image ${i}:`, {
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
      });
    });
  }, []);

  // Create image data with fallbacks
  const createCarouselData = async () => {
    const imageNames = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
    const data = [];
    
    for (let i = 0; i < imageNames.length; i++) {
      try {
        const imagePath = await attemptLoadImage(imageNames[i], i);
        data.push({
          image: imagePath,
          fallback: PLACEHOLDER_IMAGE,
          title: "",
          index: i
        });
      } catch (e) {
        console.error(`Failed to load image ${i}:`, e);
        data.push({
          image: PLACEHOLDER_IMAGE,
          title: `Image ${i} (Failed to load)`,
          index: i
        });
      }
    }
    
    return data;
  };

  const [carouselData, setCarouselData] = useState([]);
  
  useEffect(() => {
    createCarouselData().then(data => {
      setCarouselData(data);
      console.log('Carousel data created:', data);
    });
  }, []);

  useEffect(() => {
    // Only initialize Swiper when we have carousel data
    if (carouselData.length === 0) return;
    
    // Initialize Swiper with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (document.querySelector('.mySwiper')) {
        swiperRef.current = new Swiper('.mySwiper', {
          effect: 'cards',
          grabCursor: true,
          initialSlide: 0,
          speed: 500,
          loop: true,
          cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: false,
          }
        });
      } else {
        console.error('Swiper container not found in the DOM');
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, [carouselData]);

  const handleImageLoad = (index) => {
    console.log(`Image ${index} loaded successfully`);
    setImageStatuses(prev => ({
      ...prev,
      [index]: { loaded: true, error: false }
    }));
  };

  const handleImageError = (index, e) => {
    console.error(`Image ${index} failed to load:`, e.target.src);
    setImageStatuses(prev => ({
      ...prev,
      [index]: { loaded: false, error: true }
    }));
    
    // Fall back to placeholder
    e.target.src = PLACEHOLDER_IMAGE;
  };

  // If no data yet, show loading state
  if (carouselData.length === 0) {
    return <div className="carousel-container">Loading carousel...</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <div className="carousel-swiper">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {carouselData.map((item) => (
                <div key={item.index} className="swiper-slide">
                  <img 
                    src={item.image} 
                    alt={`Slide ${item.index + 1}`}
                    onLoad={() => handleImageLoad(item.index)}
                    onError={(e) => handleImageError(item.index, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Debug info - remove in production */}
      {debugInfo && (
        <div style={{ display: 'none' }}>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          <pre>{JSON.stringify(imageStatuses, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;