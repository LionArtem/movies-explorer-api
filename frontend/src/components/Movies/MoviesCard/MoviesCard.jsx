import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Style from './MoviesCard.module.scss';

import Preloader from '../Preloader/Preloader';

import { addLike, selectMovies } from '../../../redax/slices/MoviesSlice';

export default function MoviesCard({ moviesInPage }) {
  console.log(moviesInPage);
  const dispatch = useDispatch();

  const { showPreloader, swowNodFaund, textAnswer } = useSelector(selectMovies);

  const saveMoviesButton = (id) => {
    const movis = moviesInPage.map((obj) => {
      if (obj.movieId === id) {
        return { ...obj, like: !obj.like };
      }
      return obj;
    });
    dispatch(addLike(movis));
  };

  return (
    <ul className={Style.list}>
      {moviesInPage.length > 0 ? (
        moviesInPage.map((obj) => (
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
      ) : showPreloader ? (
        [...new Array(7)].map((_, i) => <Preloader key={i} />)
      ) : swowNodFaund ? (
        <p>Ничего не найдено</p>
      ) : (
        ''
      )}
      {textAnswer ? (
        <p>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        ''
      )}
    </ul>
  );
}
