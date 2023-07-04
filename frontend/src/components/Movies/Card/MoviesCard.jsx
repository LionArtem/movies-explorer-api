import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Style from './MoviesCard.module.scss';

import Preloader from '../Preloader/Preloader';

import { addLike, selectMovies } from '../../../redax/slices/MoviesSlice';

import {
  fetchAddMovies,
  fetchDeleteSavedMovies,
} from '../../../redax/slices/MoviesSavedSlice';



import { selectAuth } from '../../../redax/slices/authSlice';

import { deleteLikeinPage } from '../../../utils/constants';

export default function MoviesCard({ moviesInPage }) {
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);
  const { showPreloader, swowNodFaund, textAnswer, stateTogl } =
    useSelector(selectMovies);

  const saveMoviesButton = (obj) => {
    if (!obj.like) {
      dispatch(fetchAddMovies(obj, token)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          const movis = moviesInPage.map((element) => {
            if (element.movieId === obj.movieId) {
              return { ...element, like: !element.like, _id: res.payload._id };
            }
            return element;
          });
          dispatch(addLike(movis));
        }
      });
    } else {
      dispatch(fetchDeleteSavedMovies(obj._id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(addLike(deleteLikeinPage(res, obj, moviesInPage)));
        }
      });
    }
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
                onClick={() => saveMoviesButton(obj)}
                className={
                  obj.like
                    ? `${Style.button} ${Style.like_active}`
                    : `${Style.button} ${Style.like_off}`
                }
              ></button>
            </div>
            <img src={obj.image} alt={`заставка к фильму ${obj.nameRU}`} />
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
