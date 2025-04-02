import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b6f5eb64-887c-43b1-aaba-d52a4c59a379",
      title: "Software Development",
      description: "Passionate about creating elegant solutions to complex problems through code. Specializing in full-stack development with modern technologies."
    },
    {
      image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
      title: "Cloud Technologies",
      description: "Experienced in cloud platforms and services, with a focus on scalable and efficient solutions."
    },
    {
      image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fc21e481-e28a-41a8-9db3-3b62c1ddc17e",
      title: "Team Collaboration",
      description: "Strong believer in the power of teamwork and effective communication in software development."
    },
    {
      image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6b6ad966-79e1-4d3c-8f92-566d0fee8082",
      title: "Innovation",
      description: "Always excited to explore new technologies and methodologies to stay at the forefront of software development."
    }
  ];

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <div className="carousel-info">
          <p>
            {carouselData[activeIndex].description}
          </p>
        </div>
        <div className="carousel-swiper">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {carouselData.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.image} alt={item.title} />
                <div className="overlay">
                  <span>{index + 1}</span>
                  <h2>{item.title}</h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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