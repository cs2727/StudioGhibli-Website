import React from 'react';
import './FooterComponent.css';
import logo from '../Images/logo.png';
import twitterLogo from '../Images/twitter.png';
import instagramLogo from '../Images/instagram.png';
import youtubeLogo from '../Images/youtube.png';
import facebookLogo from '../Images/facebook.png';

function FooterComponent() {
  return (
    <footer>
      <div className="footerImgContainer">
        <div>
          <img src={logo} alt="studio-ghibli-logo" />
        </div>
      </div>

      <div className="footerContextContainer">
        <ul className="footerLinksContainer">
          <li>About</li>
          <li>
            <a href="#">Studio Ghibli</a>
          </li>
          <li>
            <a href="#">GKids</a>
          </li>
          <li>
            <a href="#">FAQS</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>

        <div className="footerSocialMediaContainer">
          <img src={twitterLogo} alt="twitter Logo" />
          <img src={facebookLogo} alt="facebook Logo" />
          <img src={youtubeLogo} alt="youtube Logo" />
          <img src={instagramLogo} alt="instagram Logo" />
        </div>
      </div>

      <div className="allRightsReservedContainer">
        <div>
          <p>2022 Studio Ghibli. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
