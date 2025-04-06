import React from 'react';
import About from '../About';
import CareerPath from '../CareerPath'; // Updated import path
import Connect from '../Connect';
import Footer from '../shared/Footer';

const HomePage = () => (
  <>
    <section className="about-section">
      <About />
    </section>
    
    {/* Add CareerPath here - replacing or alongside Experience/Updates */}
    <CareerPath />
    
    {/* You can comment out this section if you want to replace it completely with CareerPath */}
    {/* <div className="experience-updates-container">
      <Experience />
      <Updates />
    </div> */}
    
    <Connect />
    <Footer />
  </>
);

export default HomePage;