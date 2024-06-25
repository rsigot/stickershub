import React from 'react';
import '../Css/Home.css';

const Footer = () => {
  return (
    <footer>
    <img src="https://i.imgur.com/7sfxxYk.png" alt="Company Logo" style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
    <p>&copy; 2024 StickersHub1. All rights reserved.</p>
    <div className="social-icons">
      <a href="https://x.com/StickersHubWAX" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter" style={{ fontSize: '30px' }}></i>
      </a>
      <a href="https://discord.com/invite/NeUgxfuSZQ" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-discord" style={{ fontSize: '30px' }}></i>
      </a>
      <a href="https://www.facebook.com/people/Stickershub1/100071760019083/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook" style={{ fontSize: '30px' }}></i>
      </a>
      <a href="https://www.youtube.com/channel/UCqFGvTOI5NXi_ryyVUgScIg" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube" style={{ fontSize: '30px' }}></i>
      </a>
    </div>
  </footer>
  );
};

export default Footer;
