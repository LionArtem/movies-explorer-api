import React from 'react';
import { useDispatch } from 'react-redux';

import Style from './MoviesCard.module.scss';

import { addLike } from '../../../redax/slices/MoviesSlice';

export default function MoviesCard({ moviesAll }) {
  console.log(moviesAll);
  const dispatch = useDispatch();
  const saveMoviesButton = (id) => {
    const movis = moviesAll.map((obj) => {
      if (obj.movieId === id) {
        return { ...obj, like: !obj.like };
      }
      return obj;
    });
    dispatch(addLike(movis));
  };
  return (
    <ul className={Style.list}>
      {moviesAll.length > 0
        ? moviesAll.map((obj) => (
            <li className={Style.conteiner} key={obj.movieId}>
              <div className={Style.discription}>
                <a target="blank" href={`${obj.trailerLink}`}>
                  <h1>{obj.nameRU}</h1>
                  <p>{`${Math.floor(obj.duration / 60)}ч ${
                    obj.duration % 60
                  }м`}</p>
                </a>
                <button
                  onClick={() => saveMoviesButton(obj.movieId)}
                  className={
                    obj.like
                      ? `${Style.button} ${Style.like_active}`
                      : `${Style.button} ${Style.like_off}`
                  }
                ></button>
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
