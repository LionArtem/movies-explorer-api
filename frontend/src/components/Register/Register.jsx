import React from 'react';
import PopupForm from '../PopupForm/PopupForm';

export default function Register() {
  return (
    <>
      <PopupForm
        title={'Рады видеть!'}
        textButton="Зарегистрироваться"
        textRegistr="Уже зарегистрированны?"
        textLogin="Войти"
        link="/signin"
      ></PopupForm>
    </>
  );
}
