import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import './HeaderComponent.css';

function HeaderComponent() {
  return (
    <header>
      <div className="logoContainer">
        <Link to="/">
          <img src={logo} alt="studio-ghibli-logo" />
        </Link>
      </div>
      <nav>
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
            <Link to="#">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderComponent;
