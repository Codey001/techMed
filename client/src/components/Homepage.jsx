import React from 'react';
import "../styles/homepage.css"; // Importing the CSS file for styling

const Homepage = () => {
  return (
    <div className="homepage">

      <div className="main-content">
        <div className="images">
          <img src="image1.jpg" alt="Doctor and child" className="img-box" />
          <img src="image2.jpg" alt="Doctor writing" className="img-box" />
          <img src="image3.jpg" alt="Smiling doctor" className="img-box large" />
        </div>
        
        <div className="text-content">
          <h1>Bridging Health with Technology, Anywhere, Anytime.</h1>
          <p>
            TechMed offers instant access to healthcare consultations from anywhere, connecting patients 
            with medical professionals. With secure data handling, easy payments, and transcription services, 
            MedTech ensures seamless, reliable care at your fingertips.
          </p>
          <button className="get-started-btn">Get Started <span className="arrow">→</span></button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
