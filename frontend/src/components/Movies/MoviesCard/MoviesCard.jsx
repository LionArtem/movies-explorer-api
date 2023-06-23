import React from 'react';
import Style from './MoviesCard.module.scss';

export default function MoviesCard({ listMovies, children }) {
  return (
    <ul className={Style.list}>
      {listMovies
        ? listMovies.map((obj, i) => (
            <li className={Style.conteiner} key={i}>
              <div className={Style.discription}>
                <div>
                  <h1>{obj.title}</h1>
                  <p>{obj.time}</p>
                </div>
                {children}
              </div>
              <img src={obj.preview} alt={`заставка к фильму ${obj.title}`} />
            </li>
          ))
        : ''}
    </ul>
  );
}
