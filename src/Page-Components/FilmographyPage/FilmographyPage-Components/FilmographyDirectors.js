import React, { useRef, useEffect } from 'react';
import './FilmographyDirectors.css';

export default function FilmographyDirectors({
  directorsInput,
  settingFilmDirector,
}) {
  const selectElement = useRef();

  // this function in the useEffect will be invoked only once this component unmounts, is removed/unrendered and thus we
  // are setting filmDirector back to an empty string, no director selected and as result all films show again once this component
  //is rendered/mounted again!!
  useEffect(() => {
    return () => settingFilmDirector('');
  }, []);

  function togglingDirector() {
    const selectedOptionIndex = selectElement.current.selectedIndex;
    const directorSelected =
      selectElement.current.children[selectedOptionIndex].innerHTML;
    settingFilmDirector(directorSelected);
  }

  return (
    <form className="filmDirectorForm">
      <label htmlFor="filmDirectors">Choose a film director: </label>
      <select id="directors" onChange={togglingDirector} ref={selectElement}>
        {directorsInput.map((director) => (
          <option value={director}>{director}</option>
        ))}
      </select>
    </form>
  );
}
