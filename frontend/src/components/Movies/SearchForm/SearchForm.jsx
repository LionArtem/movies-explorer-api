import React from 'react';
import Style from './SearchForm.module.scss';

export default function SearchForm() {
  return (
    <form className={Style.form}>
      <input placeholder="Фильм" />
      <button />
    </form>
  );
}
