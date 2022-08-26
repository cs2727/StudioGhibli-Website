import React, { useContext } from 'react';
import './FilmographyPage.css';
import { fetchingFilmsContext } from '../../ContextComponents/FetchingFilmsContext';
import FilmographyItem from './FilmographyPage-Components/FilmographyItem';
import FilmographyDirectors from './FilmographyPage-Components/FilmographyDirectors';

export default function FilmographyPage() {
  const {
    filmsRetrieved, // this will be an variable containing our an array with all the studio ghibli films
    filmDirectors, // this will be an variable containing our an array with all the studio ghibli film directors
    filmDirector, // this will be a variable containing the film director chosen by the user via the select element
    directorSelected, // this will be a variable containing a function that will change the filmDirector
  } = useContext(fetchingFilmsContext);

  let films;

  // this if statement will only be true if a film Director has been selected and as a result we will filter the
  // filmsRetrieved arr for the relevant films that were directed by the selected director
  if (filmDirector) {
    films = filmsRetrieved.filter((film) => film.director === filmDirector);
  } else {
    films = filmsRetrieved;
  }

  return (
    <div className="filmographypage-wrapper">
      {/*this is the h1 element telling which directors films are being shown */}
      <h1>{filmDirector ? filmDirector : 'Studio Ghibli'} Films</h1>{' '}
      {filmsRetrieved ? (
        <>
          {' '}
          {/* This is the select Element that contains all our film directors */}
          <FilmographyDirectors
            directorsInput={filmDirectors}
            settingFilmDirector={directorSelected}
          />
          {/* This is the UnorderedList that will contain our films */}
          <ul className="filmsList">
            {films.map((film) => (
              <FilmographyItem filmInput={film} key={film.id} />
            ))}
          </ul>
        </>
      ) : (
        <h1>Currently loading films</h1>
      )}
    </div>
  );
}
