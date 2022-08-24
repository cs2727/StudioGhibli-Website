import React, { createContext, useEffect, useState } from 'react';

export const fetchingFilmsContext = createContext();

function FetchingDataContext(props) {
  // this filmsRetrieved array will contain all the films that were returned by the http Response of our request
  const [filmsRetrieved, setFilmsRetrieved] = useState(false);

  // this filmDirectors array will contain all the differing film directors of Studio Ghibli
  const [filmDirectors, setFilmDirectors] = useState([]);

  // this filmDirector will store a string that will be the film Director selected by the user
  const [filmDirector, setFilmDirector] = useState('');

  // this filmTitles array will contain all the differing film titles of Studio Ghibli
  const [filmTitles, setFilmTitles] = useState([]);

  // This function is to retrieve all films from Studio Ghibli and to set the filmsRetrieved, filmDirectors, and filmTitles state
  function fetchingFilms() {
    fetch('https://ghibliapi.herokuapp.com/films')
      .then((httpResponse) => {
        return httpResponse.json();
      })
      .then((films) => {
        setFilmsRetrieved(films);
        // we will be invoking fetchingFilmDirectors function to create an array with all the differing film makers of this studio!
        fetchingFilmDirectors(films);
        fetchingFilmTitles(films);
      });
  }

  // This function is to retrieve all the differing directors of films from Studio Ghibli to provide the input for the
  // select element of the FilmographyDirector Component
  function fetchingFilmDirectors(films) {
    const directorsList = [];
    let setIterable;

    for (const film of films) {
      directorsList.push(film.director);
    }

    setIterable = new Set(directorsList);
    setFilmDirectors(['', ...setIterable]);
  }

  // This function will be set to set the specific director chosen via the <select> element
  function directorSelected(director) {
    setFilmDirector(director);
  }

  // This function is to retrieve all the differing titles of films from Studio Ghibli to provide the input for the
  // select element of the FilmTitle Component
  function fetchingFilmTitles(films) {
    const filmTitlesList = [];

    let setIterable;

    for (const film of films) {
      filmTitlesList.push(film.title);
    }

    setIterable = new Set(filmTitlesList);
    setFilmTitles(['', ...setIterable]);
  }

  useEffect(() => {
    fetchingFilms();
  }, []);

  // this is the object that will be avaliable to all the children of the fetchingContext.Provider custom component
  const contextData = {
    filmsRetrieved,
    filmDirectors,
    filmDirector,
    directorSelected,
    filmTitles,
  };
  return (
    <fetchingFilmsContext.Provider value={contextData}>
      {props.children}
    </fetchingFilmsContext.Provider>
  );
}

export default FetchingDataContext;
