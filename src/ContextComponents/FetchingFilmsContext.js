import React, { createContext, useEffect, useState } from 'react';

export const fetchingFilmsContext = createContext();

function FetchingDataContext(props) {
  const [filmsRetrieved, setFilmsRetrieved] = useState(false); // this will be responsible for the films
  const [filmDirectors, setFilmDirectors] = useState([]); // this will be responsible for all the films directors
  const [filmDirector, setFilmDirector] = useState(''); // this will be responsible for the film director chosen via select element
  const [filmTitles, setFilmTitles] = useState([]);

  // This function is to retrieve all films from Studio Ghibli
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

  // This function is to retrieve all the directors of the differing films from Studio Ghibli
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

  // This function is to retrieve all the differing titles of films from Studio Ghibli
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
