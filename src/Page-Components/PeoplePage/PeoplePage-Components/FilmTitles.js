import React, { useContext, useRef } from 'react';
import { fetchingFilmsContext } from '../../../ContextComponents/FetchingFilmsContext';
import './FilmTitles.css';

export default function FilmTitles({ sortingCharactersInput }) {
  const { filmTitles } = useContext(fetchingFilmsContext);
  const selectElement = useRef();

  function togglingFilmTitle(eventInst) {
    const filmTitleSelectedIndex = eventInst.currentTarget.selectedIndex;
    const filmTitleSelected =
      selectElement.current.children[filmTitleSelectedIndex].innerHTML;
    sortingCharactersInput(filmTitleSelected);
  }

  return (
    <form>
      <label htmlFor="filmTitles">Film Titles:</label>
      <select id="filmTitles" onChange={togglingFilmTitle} ref={selectElement}>
        {filmTitles.map((filmTitle) => {
          return <option value={filmTitle}>{filmTitle}</option>;
        })}
      </select>
    </form>
  );
}
