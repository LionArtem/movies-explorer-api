import React from 'react';
import Style from './SearchForm.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { selectMovies, setValue } from '../../../redax/slices/MoviesSlice';

export default function SearchForm({ getMovies }) {
  const dispatch = useDispatch();
  const { errorText, value } = useSelector(selectMovies);
  return (
    <section>
      <form
        noValidate
        onSubmit={(evt) => getMovies(evt)}
        className={Style.form}
      >
        <input
          value={value}
          onChange={(evt) => dispatch(setValue(evt.target.value))}
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
