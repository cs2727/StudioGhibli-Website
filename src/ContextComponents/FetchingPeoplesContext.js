import React, { useEffect, useState, createContext, useContext } from 'react';
import { fetchingFilmsContext } from './FetchingFilmsContext';

export const fetchingPeoplesContext = createContext();

// This function is to retrieve all Peoples from Studio Ghibli
function FetchingPeoplesContext(props) {
  const [peoplesRetrieved, setPeoplesRetrieved] = useState('');
  const [filmCharactersRetrieved, setFilmCharactersRetrieved] = useState('');
  const [filmTitleSelected, setFilmTitle] = useState(
    'Studio Ghibli Characters'
  );
  const { filmsRetrieved } = useContext(fetchingFilmsContext);

  function fetchingPeoples() {
    fetch('https://ghibliapi.herokuapp.com/people')
      .then((httpResponse) => {
        return httpResponse.json();
      })
      .then((httpBody) => {
        numberOfPeoplePages(httpBody);
      });
  }

  // This function is so that only 12 people will be rendered for each page
  function numberOfPeoplePages(peoplesArray) {
    console.log(peoplesArray);

    const pagesArr = [];
    let arr = [];
    for (const people of peoplesArray) {
      arr.push(people);
      if (arr.length === 12) {
        pagesArr.push([...arr]);
        arr.splice(0);
      }
    }
    pagesArr.push(arr);
    setPeoplesRetrieved(pagesArr);
  }

  //

  function sortingCharacters(filmTitleSelected) {
    let filmId;
    let filmTitleCharacters = [];

    if (!filmTitleSelected) {
      setFilmCharactersRetrieved('');
      setFilmTitle('Studio Ghibli Characters');
      return;
    }

    for (const film of filmsRetrieved) {
      if (film.title === filmTitleSelected) {
        filmId = film.id;
        break;
      }
    }

    for (let i = 0; i < peoplesRetrieved.length; i++) {
      for (const people of peoplesRetrieved[i]) {
        const splittingFilmsArr = people.films[0].split('/');
        const selectedFilmId = splittingFilmsArr[4];

        if (filmId === selectedFilmId) {
          filmTitleCharacters.push(people);
        }
      }
    }
    setFilmTitle(`${filmTitleSelected} Characters`);
    setFilmCharactersRetrieved(filmTitleCharacters);
  }

  const contextData = {
    filmTitleSelected,
    peoplesRetrieved,
    filmCharactersRetrieved,
    sortingCharacters,
  };

  useEffect(() => {
    fetchingPeoples();
  }, []);

  return (
    <fetchingPeoplesContext.Provider value={contextData}>
      {props.children}
    </fetchingPeoplesContext.Provider>
  );
}

export default FetchingPeoplesContext;
