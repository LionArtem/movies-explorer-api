import React from 'react';
import { useSelector } from 'react-redux';

import Style from './Profile.module.scss';
import { useNavigate } from 'react-router-dom';
import HeaderMovies from '../Movies/HeaderMovies/HeaderMovies';
import { useDispatch } from 'react-redux';
import {
  setValueSearch,
  resetMoviesInPage,
} from '../../redax/slices/MoviesSlice';
import {
  selectformValidetion,
  setValue,
} from '../../redax/slices/formValidetionSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { valid, value, errors } = useSelector(selectformValidetion);
  const user = {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
  };
  const checkValue = (value, name, email) => {
    let userName;
    let userEmail;

    if (value.name === undefined) {
      userName = user.name;
    } else {
      userName = value.name;
    }

    if (value.email === undefined) {
      userEmail = user.email;
    } else {
      userEmail = value.email;
    }

    if (userName === name && userEmail === email) {
      return false;
    } else {
      return true;
    }

  };
  return (
    <>
      <HeaderMovies />
      <h1 className={Style.title}>Привет, кто то!</h1>
      <form className={Style.form}>
        <label>имя</label>
        <input
          className={Style.name}
          pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
          name="name"
          onChange={(evt) =>
            dispatch(
              setValue({
                value: evt.target.value,
                name: evt.target.name,
                errors: evt.target.validationMessage,
                valid: evt.target.closest('form').checkValidity(),
              })
            )
          }
          value={value.name ? value.name : user.name}
          required
          minLength="2"
          maxLength="30"
        ></input>
        <span className={Style.span}>{errors.name}</span>
        <label>Email</label>
        <input
          required
          className={Style.email}
          pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z0-9_\-]+"
          onChange={(evt) =>
            dispatch(
              setValue({
                value: evt.target.value,
                name: evt.target.name,
                errors: evt.target.validationMessage,
                valid: evt.target.closest('form').checkValidity(),
              })
            )
          }
          value={value.email ? value.email : user.email}
          name="email"
          type="email"
        ></input>
        <span className={Style.span}>{errors.email}</span>
        {valid && checkValue(value, user.name, user.email) ? (
          <button>Редактировать</button>
        ) : (
          <button disabled className={Style.button_off}>
            Редактировать
          </button>
        )}
      </form>
      <p
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('moviesCard');
          localStorage.removeItem('valueSearch');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          dispatch(setValueSearch(''));
          dispatch(resetMoviesInPage());
          navigate('/', { replace: true });
        }}
        className={Style.sign_out}
      >
        Выйти из аккаунта
      </p>
    </>
  );
}
