import React from 'react';
import Style from './MoviesCard.module.scss';

export default function MoviesCard({ listMovies }) {
  const location = window.location.pathname;
  return (
    <ul className={Style.root}>
      {listMovies.map((obj, i) => (
        <li className={Style.conteiner} key={i}>
          <div className={Style.discription}>
            <div>
              <h1>{obj.title}</h1>
              <p>{obj.time}</p>
            </div>
            {location === '/saved-movies' ? (
              <button className={`${Style.like} ${Style.delete}`}></button>
            ) : (
              <button
                className={
                  obj.like
                    ? `${Style.like} ${Style.like_active}`
                    : `${Style.like} ${Style.like_off}`
                }
              ></button>
            )}
          </div>
          <img src={obj.preview} alt={`заставка к фильму ${obj.title}`} />
        </li>
      ))}
    </ul>
  );
}
