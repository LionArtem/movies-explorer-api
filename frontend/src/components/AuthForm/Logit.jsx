import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useNavigate } from 'react-router-dom';
import Style from './AuthForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectformValidetion,
  setValue,
} from '../../redax/slices/formValidetionSlice';
import { auth } from '../../utils/Auth';

export default function Logit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value, errors } = useSelector(selectformValidetion);
  const { email, password } = value;
  const handlelSubmit = (evt) => {
    evt.preventDefault();
    auth
      .loginUser(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //navigate('/movies', { replace: true });
  };
  return (
    <>
      <PopupForm
        title={'Добро пожаловать!'}
        textButton="Войти"
        textRegistr="Ещё не зарегистрированны?"
        textLogin="Регистрация"
        link="/signup"
        handlelSubmit={handlelSubmit}
      >
        <div className={Style.input_conteiner}>
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
