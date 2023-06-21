import React from 'react';
import PopupForm from '../PopupForm/PopupForm';

import { useSelector } from 'react-redux';
import { selectformValidetion } from '../../redax/slices/formValidetionSlice';
import { auth } from '../../utils/Auth';

export default function Logit() {
  const { value } = useSelector(selectformValidetion);
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
      ></PopupForm>
    </>
  );
}
