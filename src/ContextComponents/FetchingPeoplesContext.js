import React, { useEffect, useState, createContext, useContext } from 'react';
import { fetchingFilmsContext } from './FetchingFilmsContext';

export const fetchingPeoplesContext = createContext();

// This function is to retrieve all Peoples from Studio Ghibli
function FetchingPeoplesContext(props) {
  // peoplesRetrieved will be a array that contains all the characters split into differing arrays (12 people per array)
  // and the relevant array will be rendered inside the ul based on which button was clicked
  const [peoplesRetrieved, setPeoplesRetrieved] = useState('');

  // filmsCharactersRetrieved will be an array that stores all the characters that belong to a specific film title and
  //thus if the value isn't the default '', then this array will be rendered inside the ul instead of the peoplesRetrieved arr
  const [filmCharactersRetrieved, setFilmCharactersRetrieved] = useState('');

  // filmTitleSelected will store the relevant film title that was selected by the user via the film title select element, this
  // will be used for the h1 header telling the user which film title characters are rendered
  const [filmTitleSelected, setFilmTitle] = useState(
    'Studio Ghibli Characters'
  );

  // this array will be used in the sortingCharacters function to match the right characters (peoplesRetrieved)
  // with the right films (filmsRetrieved)
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

  // This function will be used to set the peoplesRetrieved state, it will split the array returned by the http response
  // of our fetch http request
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

  // this function will be called once a film title is selected via the select element, we will pass into this function
  // the film Title (<option> text content) and thus we will use this to render the characters that belong to this film title
  //, if the film title selected is the empty string '', we will render all studio ghibli characters as film Characters retrieved
  // will be an empty string
  function sortingCharacters(filmTitleSelected) {
    let filmId;
    let filmTitleCharacters = [];

    // if the film Title selected is 'Studio Ghibli Characters', i'e, the first option, this if statement will true and as a result
    // we will set filmCharactersRetrieved to an empty string '', so all the film characters are rendered in the ul and set
    // the filmTitle state to 'Studio Ghibli Characters' so the header is appropriate
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

    // this is matching the characters that match/belong to the film title selected and adding them to the
    // filmTitleCharacters array which is then used as the value for the filmCharactersRetrieved state
    for (let i = 0; i < peoplesRetrieved.length; i++) {
      for (const people of peoplesRetrieved[i]) {
        const splittingFilmsArr = people.films[0].split('/');
        const selectedFilmId = splittingFilmsArr[4];

        if (filmId === selectedFilmId) {
          filmTitleCharacters.push(people);
        }
      }
    }

    // setting FilmTitle state so the correct header title is displayed
    setFilmTitle(`${filmTitleSelected} Characters`);

    //setting filmCharactersRetrieved state so correct array (list of characters) is rendered selected film title
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
