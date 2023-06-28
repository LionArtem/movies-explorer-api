import React from 'react';
import Style from './MoviesCard.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectMovies,
  setValue,
  addLike,
} from '../../../redax/slices/MoviesSlice';
import {
  fetchGatSavedMovies,
  selectSavedMovies,
  fetchDeleteSavedMovies,
} from '../../../redax/slices/MoviesSavedSlice';

import Preloader from '../Preloader/Preloader';

import { deleteLikeinPage } from '../../../utils/constants';

export default function MoviesCardSaved() {
  const dispatch = useDispatch();
  const { showPreloader, swowNodFaund, textAnswer, moviesInPage } =
    useSelector(selectMovies);
  const { moviesSaved } = useSelector(selectSavedMovies);

  React.useEffect(() => {
    dispatch(setValue(''));
    console.log(localStorage.getItem('token'));
    dispatch(fetchGatSavedMovies());
  }, []);

  const deleteMoviesButton = (obj) => {
    dispatch(fetchDeleteSavedMovies(obj._id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(addLike(deleteLikeinPage(res, obj, moviesInPage)));
      }
    });
  };
  return (
    <ul className={Style.list}>
      {moviesSaved.length > 0 ? (
        moviesSaved.map((obj) => (
          <li className={Style.conteiner} key={obj.movieId}>
            <div className={Style.discription}>
              <a target="blank" href={`${obj.trailerLink}`}>
                <h1>{obj.nameRU}</h1>
                <p>{`${Math.floor(obj.duration / 60)}ч ${
                  obj.duration % 60
                }м`}</p>
              </a>
              <button
                onClick={() => deleteMoviesButton(obj)}
                className={`${Style.button} ${Style.delete}`}
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
