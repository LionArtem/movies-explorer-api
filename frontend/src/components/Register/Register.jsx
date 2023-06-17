import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const handlelSabmit = (e) => {
    e.preventDefault();
    navigate('/signin', { replace: true });
  };
  return (
    <>
      <PopupForm
        title={'Рады видеть!'}
        textButton="Зарегистрироваться"
        textRegistr="Уже зарегистрированны?"
        textLogin="Войти"
        link="/signin"
        handlelSabmit={handlelSabmit}
      ></PopupForm>
    </>
  );
}
