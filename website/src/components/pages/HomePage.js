import React from 'react';
import About from '../About';
import Experience from '../Experience';
import Updates from '../Updates';
import Connect from '../shared/Connect';
import Footer from '../Footer';

const HomePage = () => (
  <>
    <section className="about-section">
      <About />
    </section>
    <div className="experience-updates-container">
      <div className="experience-section">
        <Experience />
      </div>
      <div className="updates-section">
        <Updates />
      </div>
    </div>
    <Connect />
    <Footer />
  </>
);

export default HomePage; 