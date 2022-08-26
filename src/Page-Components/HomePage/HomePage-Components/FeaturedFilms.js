import React from 'react';
import firstFeatureFilmImg from '../../../Images/FilmFeature-1.jpg';
import SecondFeatureFilmImg from '../../../Images/FilmFeature-2.jpg';
import './FeaturedFilms.css';

function FeaturedFilms() {
  return (
    <div className="featuredFilmsContainer">
      {/* First Featured Film Container*/}
      <div className="firstFeaturedFilmContainer">
        {/* First Featured Film Image Container*/}
        <div className="featuredFilmImgContainer">
          <img src={firstFeatureFilmImg} alt="Image from My Neighbor Totoro" />
        </div>
        {/* First Featured Film Context Container*/}
        <div className="firstFeaturedFilmContextContainer">
          <div className="firstFeatureFilmInnerContextContainer">
            <h1>MY NEIGHBOR TOTORO</h1>
            <p>
              When Satsuki and her sister Mei move with their father to a new
              home in the countryside, they find country life is not as simple
              as it seems. They soon discover that the house and nearby woods
              are full of strange and delightful creatures.
            </p>
            <button>BUY NOW</button>
          </div>
        </div>
      </div>

      {/* Second Featured Film */}
      <div className="secondFeaturedFilmContainer">
        {/* Second Featured Film Context Container*/}
        <div className="secondFeaturedFilmContextContainer">
          <div className="secondFeatureFilmInnerContextContainer">
            <h1>PONYO</h1>
            <p>
              When Sosuke, a young boy who lives on a clifftop overlooking the
              sea, rescues a stranded goldfish named Ponyo, he discovers more
              than he bargained for. Ponyo is a curious, energetic young
              creature who yearns to be human, but even as she causes chaos
              around the house, her father, a powerful sorcerer, schemes to
              return Ponyo to the sea.
            </p>
            <button>BUY NOW</button>
          </div>
        </div>

        {/* Second Featured Film Image Container*/}
        <div className="featuredFilmImgContainer">
          <img src={SecondFeatureFilmImg} alt="Image from My Ponyo" />
        </div>
      </div>
    </div>
  );
}

export default FeaturedFilms;
