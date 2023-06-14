import React from 'react';
import Style from './SearchForm.module.scss';

export default function SearchForm() {
  return (
    <section>
      <form className={Style.form}>
        <input placeholder="Фильм" />
        <button />
      </form>
    </section>
  );
}
