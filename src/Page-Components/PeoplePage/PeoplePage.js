import React, { useContext, useState, useRef, useEffect } from 'react';
import { fetchingPeoplesContext } from '../../ContextComponents/FetchingPeoplesContext';
import { fetchingFilmsContext } from '../../ContextComponents/FetchingFilmsContext';
import PeopleItem from './PeoplePage-Components/PeopleItem';
import FilmTitles from './PeoplePage-Components/FilmTitles';
import './PeoplePage.css';

function PeoplePage() {
  const {
    filmTitleSelected,
    peoplesRetrieved,
    filmCharactersRetrieved,
    sortingCharacters,
  } = useContext(fetchingPeoplesContext);
  const filmsRetrieved = useContext(fetchingFilmsContext).filmsRetrieved;

  // this currentPage will be a integer that will represent the nested arr that needs to be rendered from the peoplesRetrieved arr
  const [currentPage, setCurrentPage] = useState(0);
  const [filmTitle, setFilmTitle] = useState('');
  const buttonContainerElement = useRef();
  let i = 1;

  //  this function will make sure when we click a button, that button will turn grey to
  //  signalled it has been clicked and we are on it's page, also to get the button pages index so that correct
  // array is rendered from peoplesArray
  function peopleToRender(eventInst) {
    const buttonClicked = eventInst.currentTarget.innerHTML;
    const pageIndex = buttonClicked - 1;

    for (const button of buttonContainerElement.current.children) {
      if (buttonClicked !== button.innerHTML) {
        button.style.backgroundColor = 'white';
      }
    }
    eventInst.currentTarget.style.backgroundColor = 'grey';
    setCurrentPage(pageIndex);
  }

  //this useEffect after it's inital execution upon the PeoplePage component rendering for the first time
  // will only execute once filmTitle changes, i'e, whenever we select a new film title from the select drop down list
  // thus when we return to the all characters page by selecting the '' option, it will change filmTitle and as a result
  // it will make sure correct button that was selected is still grey!
  // useEffect is async so by the time it's call back function executes, the children (buttons) of the
  // buttonContainer element will have already rendered/exist
  useEffect(() => {
    if (
      buttonContainerElement.current &&
      buttonContainerElement.current.children.length
    ) {
      buttonContainerElement.current.children[
        currentPage
      ].style.backgroundColor = 'grey';
    }
  }, [filmTitle]);

  function handleChange(title) {
    setFilmTitle(title);
  }

  // JSX Code
  return (
    <div className="peoplepage-wrapper">
      <h1 className="mainHeader">{filmTitleSelected}</h1>
      {peoplesRetrieved && filmsRetrieved ? (
        <>
          <FilmTitles
            sortingCharactersInput={sortingCharacters}
            onChange={handleChange}
          />
          <ul className="peoplesList">
            {filmCharactersRetrieved
              ? filmCharactersRetrieved.map((person) => {
                  // this will render only characters from chosen film title as if filmCharactersRetrieved will be an arr
                  return (
                    <PeopleItem
                      personInput={person}
                      filmsInput={filmsRetrieved}
                      key={person.id}
                    />
                  );
                })
              : peoplesRetrieved[currentPage].map((person) => {
                  // this will render all films as filmCharactersRetrived is '' empty string
                  return (
                    <PeopleItem
                      personInput={person}
                      filmsInput={filmsRetrieved}
                      key={person.id}
                    />
                  );
                })}
            <div ref={buttonContainerElement} className="buttonContainer">
              {filmCharactersRetrieved
                ? null
                : // the buttons will render only if filmCharactersRetrieved is false, i'e an empty string
                  peoplesRetrieved.map(() => {
                    return <button onClick={peopleToRender}>{i++}</button>;
                  })}
            </div>
          </ul>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default PeoplePage;
