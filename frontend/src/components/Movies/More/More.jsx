import React from 'react';
import Style from './More.module.scss';
import { useDispatch } from 'react-redux';
import { addMoviesInPage } from '../../../redax/slices/MoviesSlice';

export default function More({ moviesInPage, moviesAll }) {
  const dispatch = useDispatch();
  const addMoreMovies = () => {
    dispatch(addMoviesInPage());
  };

  return (
    <div className={Style.conteiner}>
      {moviesInPage.length > 0 && !(moviesAll.length === moviesInPage.length) ? (
        <div onClick={() => addMoreMovies()}>
          <p>Ещё</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
