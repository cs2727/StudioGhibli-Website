import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FilmographyItem.css';

function FilmographyItem({ filmInput }) {
  const listItemMenuElement = useRef();
  const [content, setContent] = useState(filmInput.description);

  function togglingItem(eventInstance) {
    for (const listItem of listItemMenuElement.current.children) {
      listItem.style.color = '#909090';
    }

    eventInstance.currentTarget.style.color = 'black';

    switch (eventInstance.currentTarget.innerHTML) {
      case 'ABOUT':
        setContent(filmInput.description);
        break;
      case 'BONUS FEATURES':
        setContent(filmInput.original_title);
        break;
      default:
        setContent(filmInput.rt_score);
    }
  }

  // JSX
  return (
    <li key={filmInput.id} className="filmListItem">
      {/* This div contains img and the buttons */}
      <div className="visualContainer">
        <img src={filmInput.image}></img>
        <div className="visualButtonContainer">
          <button>VIEW TRALIER</button>
          <button>BUY NOW</button>
        </div>
      </div>

      {/* This div contains the film information */}
      <div className="contextContainer">
        <h1>
          <Link to="#">{filmInput.title.toUpperCase()}</Link>
        </h1>
        <p>
          <span>
            {filmInput.release_date} / {filmInput.running_time} Min
          </span>
        </p>
        <p>
          <span>Directed By:</span> {filmInput.director}
        </p>
        <p>
          <span>Produced By:</span> {filmInput.producer}
        </p>
        <p>
          <span>Written By:</span> {filmInput.producer}
        </p>
        <div className="innerContextContainer">
          <ul className="listItemMenu" ref={listItemMenuElement}>
            <li onClick={togglingItem}>ABOUT</li>
            <li onClick={togglingItem}>BONUS FEATURES</li>
            <li onClick={togglingItem}>REVIEWS</li>
          </ul>
          <p>{content}</p>
        </div>
      </div>
    </li>
  );
}

export default FilmographyItem;
