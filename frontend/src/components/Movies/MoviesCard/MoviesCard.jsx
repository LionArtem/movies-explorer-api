import React from 'react';
import Style from './MoviesCard.module.scss';

export default function MoviesCard({ listMovies }) {
  const location = window.location.pathname;
  return (
    <div className={Style.root}>
      {listMovies.map((obj, i) => (
        <div className={Style.conteiner} key={i}>
          <div className={Style.discription}>
            <h1>{obj.title}</h1>
            <p>{obj.time}</p>
            {location === '/saved-movies' ? (
              <div className={Style.delete}></div>
            ) : (
              <div className={obj.like ? Style.like_active : Style.like}></div>
            )}
          </div>
          <img src={obj.preview} alt={`заставка к фильму ${obj.title}`} />
        </div>
      ))}
    </div>
  );
}
