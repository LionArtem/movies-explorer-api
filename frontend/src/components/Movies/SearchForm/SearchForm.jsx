import React from 'react';
import Style from './SearchForm.module.scss';

import { useDispatch } from 'react-redux';

import { addMoviesSavedShow } from '../../../redax/slices/MoviesSavedSlice';

export default function SearchForm({
  showMovies,
  setValueSearch,
  errorText,
  valueSearch,
}) {
  const dispatch = useDispatch();
  return (
    <section>
      <form
        noValidate
        onSubmit={(evt) => showMovies(evt)}
        className={Style.form}
      >
        <input
          value={valueSearch}
          onChange={(evt) => {
            if (!evt.target.value) {
              dispatch(addMoviesSavedShow());
            }
            dispatch(setValueSearch(evt.target.value));
          }}
          required
          placeholder="Фильм"
        />
        <button type="submit" />
      </form>
      <div className={Style.conteiner_span}>
        <span
          className={
            errorText ? `${Style.span}` : `${Style.span} ${Style.add_span}`
          }
        >
          Нужно ввести ключевое слово
        </span>
      </div>
    </section>
  );
}
