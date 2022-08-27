import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import './HeaderComponent.css';

function HeaderComponent() {
  const navigationElement = useRef();
  let i = 1;

  function togglingNavigation() {
    const oddOrEven = i % 2;

    if (oddOrEven === 1) {
      navigationElement.current.classList.add('responsiveNav');
    } else {
      navigationElement.current.classList.remove('responsiveNav');
    }

    i++;
  }

  return (
    <header>
      <div className="logoContainer">
        <Link to="/">
          <img src={logo} alt="studio-ghibli-logo" />
        </Link>
      </div>
      <nav ref={navigationElement}>
        <ul>
          <li key="1">
            <Link to="/Filmography">Filmography</Link>
          </li>
          <li key="2">
            <Link to="/People">People</Link>
          </li>
          <li key="3">
            <Link to="#">In theatres</Link>
          </li>
          <li key="4">
            <Link to="/About">About</Link>
          </li>
        </ul>
      </nav>

      <div className="burgerMenuIconContainer" onClick={togglingNavigation}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default HeaderComponent;
