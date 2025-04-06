import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if you're using React Router

const About = () => {
    return (
        <section id="about" className="about-section">
            <h2>Hi! I'm Faith Winford</h2>
            <p>Building tech with purpose, advocating for equity, and bridging the gap between ideas and impact.  Learn even <Link to="/about" className="underlined-link">more about me</Link></p>
        </section>
    );
};

export default About;