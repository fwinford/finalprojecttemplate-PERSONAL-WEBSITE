import React from 'react';
import About from '../About';
import Experience from '../shared/Experience';
import Updates from '../shared/Updates';
import Connect from '../Connect';
import Footer from '../shared/Footer';

const HomePage = () => (
  <>
    <section className="about-section">
      <About />
    </section>
    <div className="experience-updates-container">
      <Experience />
      <Updates />
    </div>
    <Connect />
    <Footer />
  </>
);

export default HomePage;