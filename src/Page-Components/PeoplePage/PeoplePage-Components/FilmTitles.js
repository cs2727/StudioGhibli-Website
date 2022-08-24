import React, { useContext, useRef, useEffect } from 'react';
import { fetchingFilmsContext } from '../../../ContextComponents/FetchingFilmsContext';
import './FilmTitles.css';

export default function FilmTitles({ sortingCharactersInput, onChange }) {
  const { filmTitles } = useContext(fetchingFilmsContext);
  const selectElement = useRef();

  // this function will be called whenever a film title (<option>) is selected and will get the film title and will pass it into
  // the sortingCharactersInput function that will use this data to render the correct characters array
  function togglingFilmTitle(eventInst) {
    const filmTitleSelectedIndex = eventInst.currentTarget.selectedIndex;
    const filmTitleSelected =
      selectElement.current.children[filmTitleSelectedIndex].innerHTML;
    sortingCharactersInput(filmTitleSelected);

    // this function will be passing up to the parent componenet (PeoplePage) the filmTitleSelected
    //data which is the title of the film selected e.g 'Spirited Away ' etc
    // this data will be used to change the filmTitle state in order to make the relevant page's button grey when we return back to
    // the all studio characters page
    onChange(filmTitleSelected);
  }

  // this function in the useEffect will be invoked only once this component unmounts, is removed/unrendered and thus we
  // are setting filmTitle back to an empty string, no film title is selected and as result all characters show again once this component
  //is rendered/mounted again!!
  useEffect(() => {
    return () => sortingCharactersInput('');
  }, []);

  //JSX Code
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
