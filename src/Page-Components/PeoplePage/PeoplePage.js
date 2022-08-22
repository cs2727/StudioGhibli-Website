import React, { useContext, useState, useRef } from 'react';
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
  } = useContext(fetchingPeoplesContext); // this variable contains an array with 57 elements/peoples
  const filmsRetrieved = useContext(fetchingFilmsContext).filmsRetrieved;
  const [currentPage, setCurrentPage] = useState(0);
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

  // returning JSX
  return (
    <div className="wrapper-2">
      <h1 className="mainHeader">{filmTitleSelected}</h1>
      {peoplesRetrieved && filmsRetrieved ? (
        <>
          <FilmTitles sortingCharactersInput={sortingCharacters} />
          <ul className="peoplesList">
            {filmCharactersRetrieved
              ? filmCharactersRetrieved.map((person) => {
                  return (
                    <PeopleItem
                      personInput={person}
                      filmsInput={filmsRetrieved}
                    />
                  );
                })
              : peoplesRetrieved[currentPage].map((person) => {
                  return (
                    <PeopleItem
                      personInput={person}
                      filmsInput={filmsRetrieved}
                    />
                  );
                })}
            <div ref={buttonContainerElement} className="buttonContainer">
              {filmCharactersRetrieved
                ? null
                : peoplesRetrieved.map(() => {
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
