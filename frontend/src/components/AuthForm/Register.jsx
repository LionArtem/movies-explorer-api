import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useNavigate } from 'react-router-dom';
import Style from './AuthForm.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectformValidetion,
  resetValues,
  setValid,
  setValue,
} from '../../redax/slices/formValidetionSlice';
import {
  selectRegistration,
  addErrMessage,
  setTextButton,
  addUser,
  setLoggedIn,
  remuveErrMessage,
} from '../../redax/slices/registrationSlice';
import { auth } from '../../utils/Auth';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value, errors } = useSelector(selectformValidetion);
  const { name, email, password } = value;
  const { textButton } = useSelector(selectRegistration);

  const handlelSubmit = (evt) => {
    dispatch(setTextButton('Регистрация...'));
    evt.preventDefault();
    auth
      .addUser(name, email, password)
      .then((res) => {
        dispatch(addUser({ name: res.name, email: res.email }));
        dispatch(setLoggedIn());
        navigate('/movies', { replace: true });
        dispatch(resetValues());
        dispatch(setValid());
      })
      .catch((err) => {
        dispatch(addErrMessage(err.errMessage));
      })
      .finally(
        dispatch(setTextButton('Зарегистрироваться')),
        dispatch(remuveErrMessage())
      );
  };

  return (
    <>
      <PopupForm
        title={'Рады видеть!'}
        textButton={textButton}
        textRegistr="Уже зарегистрированны?"
        textLogin="Войти"
        link="/signin"
        handlelSubmit={handlelSubmit}
      >
        <div className={Style.input_conteiner}>
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
          <label>Email</label>
          <input
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
            required
            type="email"
          />
          <span>{errors.email}</span>
          <label>Пароль</label>
          <input
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
            value={value.password ? value.password : ''}
            name="password"
            required
            className={Style.input_password}
            type="password"
            minLength={8}
            maxLength={20}
          ></input>
          <span>{errors.password}</span>
        </div>
      </PopupForm>
    </>
  );
}
