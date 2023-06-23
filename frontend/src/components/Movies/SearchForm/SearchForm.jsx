import React from 'react';
import Style from './SearchForm.module.scss';

import { useSelector } from 'react-redux';
import { selectMovies } from '../../../redax/slices/MoviesSlice';

export default function SearchForm({ getMovies }) {
  const { errorText } = useSelector(selectMovies);
  return (
    <section>
      <form
        noValidate
        onSubmit={(evt) => getMovies(evt)}
        className={Style.form}
      >
        <input required placeholder="Фильм" />
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
