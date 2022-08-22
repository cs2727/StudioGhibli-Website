import React from 'react';
import './PeopleItem.css';

export default function PeopleItem({ personInput, filmsInput }) {
  const splittingFilmsArr = personInput.films[0].split('/');
  const filmId = splittingFilmsArr[4];

  let filmOfPerson;

  // this function is figuring out which person from the selected arr via button belongs to which film
  for (const film of filmsInput) {
    if (filmId === film.id) {
      filmOfPerson = film.title;
      break;
    }
  }

  return (
    <li className="peopleListItem">
      <h1>
        <span>Character:</span> {personInput.name}
      </h1>
      <h2>
        <span>Starring In:</span> {filmOfPerson}
      </h2>
      <h2>
        <span>Age: </span>
        {personInput.age}
      </h2>
      <h2>
        <span>Gender:</span> {personInput.gender}
      </h2>
    </li>
  );
}
