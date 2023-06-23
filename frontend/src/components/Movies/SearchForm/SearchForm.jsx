import React from 'react';
import Style from './SearchForm.module.scss';

export default function SearchForm({ getMovies }) {
  return (
    <section>
      <form onSubmit={(evt) => getMovies(evt)} className={Style.form}>
        <input required placeholder="Фильм" />
        <button type="submit" />
      </form>
    </section>
  );
}
