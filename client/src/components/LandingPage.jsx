import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaEnvelope, FaTasks, FaClock, FaChartLine } from 'react-icons/fa';
import './LandingPage.css';
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import Navbar from './Navbar';

const LandingPage = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const images = [image1, image2, image3, image4];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // Hide navigation arrows
    beforeChange: (oldIndex, newIndex) => setCurrentFeatureIndex(newIndex),
  };

  const features = [
    { icon: <FaEnvelope />, text: 'Access to thousands of movies and TV shows' },
    { icon: <FaTasks />, text: 'Personalized recommendations' },
    { icon: <FaClock />, text: 'Watch on any device, anytime' },
    { icon: <FaChartLine />, text: 'No ads, no interruptions' },
  ];

  return (
    <div className='maincontainer'><Navbar/>
    <div className="landing-page">
    
    <br></br>
      <header>
        <p className="subtitle">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
      </header>

      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Feature ${index}`} />
             
            </div>
          ))}
        </Slider>
      </div>

      <div className="feature-description">
        <p className="feature-text">{features[currentFeatureIndex].text}</p>
      </div>

      <footer>
        <p>&copy; {new Date().getFullYear()} StreamFlix. All rights reserved.</p>
      </footer>
    </div>

    </div>
  );
}

export default LandingPage;
