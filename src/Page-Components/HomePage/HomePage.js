import React from 'react';
import FeaturedFilms from './HomePage-Components/FeaturedFilms';
import ShowcasedFilm from './HomePage-Components/ShowcasedFilm';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-wrapper">
      <ShowcasedFilm />
      <FeaturedFilms />
    </div>
  );
}

export default HomePage;
