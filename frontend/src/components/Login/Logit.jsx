import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useNavigate } from 'react-router-dom';

export default function Logit() {
  const navigate = useNavigate();
  const handlelSabmit = (e) => {
    e.preventDefault();
    navigate('/movies', { replace: true });
  };
  return (
    <>
      <PopupForm
        title={'Рады видеть!'}
        textButton="Войти"
        textRegistr="Ещё не зарегистрированны?"
        textLogin="Регистрация"
        link="/signup"
        handlelSabmit={handlelSabmit}
      ></PopupForm>
    </>
  );
}
