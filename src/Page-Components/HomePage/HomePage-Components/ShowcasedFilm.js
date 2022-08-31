import React from 'react';
import { Link } from 'react-router-dom';
import spiritedAwayImg from '../../../Images/spiritedAwayHero.jpg';
import './ShowcasedFilm.css';

function ShowcasedFilm() {
  return (
    <div className="showcasedFilmContainer">
      {/* Showcased Film (Spirited Away) */}
      <img src={spiritedAwayImg} />
      {/* Showcased Film Context Container */}
      <div className="showcasedFilmContextContainer">
        <h1>Spirited Away</h1>
        <p>
          Winner of the Academy Award for Best Animated Feature, Hayao
          Miyazaki's wondrous fantasy adventure is a dazzling masterpiece.{' '}
          <br />{' '}
          <Link to="/filmography">To check out more Studio Ghibli Films</Link>
        </p>
      </div>
    </div>
  );
}

export default ShowcasedFilm;
