import React from 'react';
import Style from './Profile.module.scss';
import HeaderMovies from '../Movies/HeaderMovies/HeaderMovies';

export default function Profile() {
  const [nameValue, isNameValue] = React.useState('');
  const [emailValue, isEmailValue] = React.useState('');
  return (
    <>
      <HeaderMovies />
      <h1 className={Style.title}>Привет, кто то!</h1>
      <form className={Style.form}>
        <label>имя</label>
        <input
          required
          className={Style.name}
          value={nameValue}
          onChange={(e) => isNameValue(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          required
          className={Style.email}
          value={emailValue}
          onChange={(e) => isEmailValue(e.target.value)}
        ></input>
        <button>Редактировать</button>
      </form>
      <p
        onClick={() => localStorage.removeItem('token')}
        className={Style.sign_out}
      >
        Выйти из аккаунта
      </p>
    </>
  );
}
