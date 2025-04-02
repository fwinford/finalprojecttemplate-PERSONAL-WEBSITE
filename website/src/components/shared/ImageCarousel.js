import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      image: "/images/carousel/image1.jpg",
      title: "Software Development",
      description: "Passionate about creating elegant solutions to complex problems through code. Specializing in full-stack development with modern technologies."
    },
    {
      image: "/images/carousel/image2.jpg",
      title: "Cloud Technologies",
      description: "Experienced in cloud platforms and services, with a focus on scalable and efficient solutions."
    },
    {
      image: "/images/carousel/image3.jpg",
      title: "Team Collaboration",
      description: "Strong believer in the power of teamwork and effective communication in software development."
    },
    {
      image: "/images/carousel/image4.jpg",
      title: "Innovation",
      description: "Always excited to explore new technologies and methodologies to stay at the forefront of software development."
    }
  ];

  useEffect(() => {
    const swiper = new Swiper('.mySwiper', {
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