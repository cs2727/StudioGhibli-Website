import React, { useContext, useRef } from 'react';
import { fetchingFilmsContext } from '../../../ContextComponents/FetchingFilmsContext';
import './FilmTitles.css';

export default function FilmTitles({ sortingCharactersInput, onChange }) {
  const { filmTitles } = useContext(fetchingFilmsContext);
  const selectElement = useRef();

  function togglingFilmTitle(eventInst) {
    const filmTitleSelectedIndex = eventInst.currentTarget.selectedIndex;
    const filmTitleSelected =
      selectElement.current.children[filmTitleSelectedIndex].innerHTML;
    sortingCharactersInput(filmTitleSelected);

    // this function will be passing up to the parent componenet (PeoplePage) the filmTitleSelected
    //data which is the title of the film selected e.g 'Spirited Away ' etc
    // this data will be used to change the state in order to make the relevant page's button grey when we return back to
    // the all studio characters page
    onChange(filmTitleSelected);
  }

  return (
    <form className="filmTitlesForm">
      <label htmlFor="filmTitles">Film Titles:</label>
      <select id="filmTitles" onChange={togglingFilmTitle} ref={selectElement}>
        {filmTitles.map((filmTitle) => {
          return <option value={filmTitle}>{filmTitle}</option>;
        })}
      </select>
    </form>
  );
}
