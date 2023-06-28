import React from 'react';
import Style from './Profile.module.scss';
import { useNavigate } from 'react-router-dom';
import HeaderMovies from '../Movies/HeaderMovies/HeaderMovies';
import { useDispatch } from 'react-redux';
import { setValue, resetMoviesInPage } from '../../redax/slices/MoviesSlice';

export default function Profile() {
  const dispath = useDispatch();
  const navigate = useNavigate();
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
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('moviesCard');
          localStorage.removeItem('valueSearch');
          dispath(setValue(''));
          dispath(resetMoviesInPage());
          navigate('/', { replace: true });
        }}
        className={Style.sign_out}
      >
        Выйти из аккаунта
      </p>
    </>
  );
}
