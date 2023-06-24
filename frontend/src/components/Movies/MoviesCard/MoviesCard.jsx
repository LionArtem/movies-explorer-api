import React from 'react';
import Style from './MoviesCard.module.scss';

export default function MoviesCard({ moviesAll, children, isClickLake }) {
  return (
    <ul className={Style.list}>
      {moviesAll.length > 0
        ? moviesAll.map((obj, i) => (
            <li className={Style.conteiner} key={i}>
              <div className={Style.discription}>
                <div>
                  <h1>{obj.nameRU}</h1>
                  <p>{`${Math.floor(obj.duration / 60)}ч ${
                    obj.duration % 60
                  }м`}</p>
                </div>
                <div onClick={() => isClickLake()}>{children}</div>
              </div>
              <img
                src={`https://api.nomoreparties.co${obj.image}`}
                alt={`заставка к фильму ${obj.nameRU}`}
              />
            </li>
          ))
        : ''}
    </ul>
  );
}
