import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';

// Import images (you'll need to add these to your private assets folder)
import image1 from '../../assets/private/carousel-1.jpg';
import image2 from '../../assets/private/carousel-2.jpg';
import image3 from '../../assets/private/carousel-3.jpg';
import image4 from '../../assets/private/carousel-4.jpg';

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      image: image1,
      title: "Software Development",
      description: "Passionate about creating elegant solutions to complex problems through code. Specializing in full-stack development with modern technologies."
    },
    {
      image: image2,
      title: "Cloud Technologies",
      description: "Experienced in cloud platforms and services, with a focus on scalable and efficient solutions."
    },
    {
      image: image3,
      title: "Team Collaboration",
      description: "Strong believer in the power of teamwork and effective communication in software development."
    },
    {
      image: image4,
      title: "Innovation",
      description: "Always excited to explore new technologies and methodologies to stay at the forefront of software development."
    }
  ];

  useEffect(() => {
    const swiper = new Swiper('.mySwiper', {
      effect: 'cards',
      grabCursor: true,
      initialSlide: 0,
      speed: 800,
      loop: true,
      rotate: true,
      slideShadows: false,
      cardsEffect: {
        perSlideOffset: 5,
        perSlideRotate: 2,
        rotate: true,
        slideShadows: false,
      },
      on: {
        slideChange: (swiper) => {
          setActiveIndex(swiper.realIndex);
        }
      }
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <div className="carousel-info">
          <p className="intro">Hello! I am Faith Winford</p>
          <p className="subtitle">A HeadStart Fellowship fellow with a passion for software development and technology...</p>
          <p className="description">
            and I also {carouselData[activeIndex].description}
          </p>
        </div>
        <div className="carousel-swiper">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              {carouselData.map((item, index) => (
                <div key={index} className="swiper-slide">
                  <img src={item.image} alt={item.title} />
                  <div className="overlay">
                    <span>{index + 1}</span>
                    <h2>{item.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ul className="circles">
        {[...Array(10)].map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default ImageCarousel; 