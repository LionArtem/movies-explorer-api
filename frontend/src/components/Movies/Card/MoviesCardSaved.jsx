import React from 'react';
import Style from './MoviesCard.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setValueSearch, addLike } from '../../../redax/slices/MoviesSlice';
import {
  fetchGatSavedMovies,
  selectSavedMovies,
  fetchDeleteSavedMovies,
} from '../../../redax/slices/MoviesSavedSlice';

import { selectAuth } from '../../../redax/slices/authSlice';

import Preloader from '../../Preloader/Preloader';

import { deleteLikeinPage } from '../../../utils/constants';

export default function MoviesCardSaved() {
  const dispatch = useDispatch();
  const { showPreloader, swowNodFaund, textAnswer, moviesSaved } =
    useSelector(selectSavedMovies);
  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    dispatch(setValueSearch(''));
  }, []);

  const deleteMoviesButton = (obj, evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(fetchDeleteSavedMovies(obj._id, token)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(addLike(deleteLikeinPage(res, obj, moviesSaved)));
      }
    });
  };

  return (
    <ul className={Style.list}>
      {moviesSaved.length > 0 ? (
        moviesSaved.map((obj) => (
          <a key={obj.movieId} target="blank" href={`${obj.trailerLink}`}>
            <li className={Style.conteiner}>
              <div className={Style.discription}>
                <h1>{obj.nameRU}</h1>
                <p>{`${Math.floor(obj.duration / 60)}ч ${
                  obj.duration % 60
                }м`}</p>
                <button
                  onClick={(evt) => deleteMoviesButton(obj, evt)}
                  className={`${Style.button} ${Style.delete}`}
                ></button>
              </div>
              <img src={obj.image} alt={`заставка к фильму ${obj.nameRU}`} />
            </li>
          </a>
        ))
      ) : showPreloader ? (
        <Preloader />
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
