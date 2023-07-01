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
  defaultValues,
  resetValues,
} from '../../redax/slices/formValidetionSlice';

import {
  fetchGetUser,
  selectUser,
  fetchPatchUser,
  resetAnswerRequest,
} from '../../redax/slices/userSlice';

import { selectAuth } from '../../redax/slices/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { valid, value, errors } = useSelector(selectformValidetion);
  const { token } = useSelector(selectAuth);
  const { user, answerRequest, succsesAnswer } = useSelector(selectUser);

  const editUser = (evt) => {
    evt.preventDefault();
  };

  React.useEffect(() => {
    dispatch(fetchGetUser({ token })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(
          defaultValues({
            name: res.payload.name,
            email: res.payload.email,
          })
        );
      }
    });
  }, []);

  const checkValue = (value, name, email) => {
    if (value.name !== name || value.email !== email) {
      return true;
    } else {
      return false;
    }
  };

  const deleteErrRequest = () => {
    if (answerRequest.length > 0) {
      dispatch(resetAnswerRequest());
    }
  };

  return (
    <>
      <HeaderMovies />
      <h1 className={Style.title}>Привет, кто то!</h1>
      <form className={Style.form} onSubmit={(evt) => editUser(evt)}>
        <label>имя</label>
        <input
          className={Style.name}
          pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
          name="name"
          onClick={() => deleteErrRequest()}
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
          value={value.name ? value.name : ''}
          required
          minLength="2"
          maxLength="30"
        ></input>
        <span className={Style.span}>{errors.name}</span>
        <label>Email</label>
        <input
          onClick={() => deleteErrRequest()}
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
          value={value.email ? value.email : ''}
          name="email"
          type="email"
        ></input>
        <span className={`${Style.span} ${Style.span_email}`}>
          {errors.email}
        </span>
        <span
          className={
            succsesAnswer
              ? `${Style.span} ${Style.span_err_request} ${Style.span_seccses}`
              : `${Style.span} ${Style.span_err_request}`
          }
        >
          {answerRequest}
        </span>
        {valid && checkValue(value, user.name, user.email) ? (
          <button
            onClick={() => {
              dispatch(
                fetchPatchUser({ token, name: value.name, email: value.email })
              );
              setTimeout(() => dispatch(resetAnswerRequest()), 3000);
            }}
            type="submit"
          >
            Редактировать
          </button>
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
          dispatch(setValueSearch(''));
          dispatch(resetMoviesInPage());
          dispatch(resetValues());
          navigate('/', { replace: true });
        }}
        className={Style.sign_out}
      >
        Выйти из аккаунта
      </p>
    </>
  );
}
