import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectformValidetion,
  resetValues,
  setValid,
  setValue,
} from '../../redax/slices/formValidetionSlice';
import {
  selectAuth,
  remuveErrMessage,
  fetchAddUser,
} from '../../redax/slices/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value, errors } = useSelector(selectformValidetion);
  const { textButtonRegister,errMessage } = useSelector(selectAuth);

  const handlelSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchAddUser())
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/movies', { replace: true });
          dispatch(resetValues());
          dispatch(setValid());
        }
      })
      .finally(
        dispatch(remuveErrMessage())
      );
  };

  return (
    <>
      <PopupForm
        title={'Рады видеть!'}
        textButton={textButtonRegister}
        textRegistr="Уже зарегистрированны?"
        textLogin="Войти"
        link="/signin"
        handlelSubmit={handlelSubmit}
        errMessage={errMessage}
        remuveErrMessage={remuveErrMessage}
      >
        <label>Имя(формат:латиница, кириллица, пробел, дефис)</label>
        <input
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
          value={value.name ? value.name : ''}
          required
          minLength="2"
          maxLength="30"
        />
        <span>{errors.name}</span>
      </PopupForm>
    </>
  );
}
