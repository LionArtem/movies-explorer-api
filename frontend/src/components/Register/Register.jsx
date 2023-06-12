import React from 'react';
import PopupForm from '../PopupForm/PopupForm';

export default function Register() {
  return (
    <>
      <PopupForm
        title={'Добро пожаловать!'}
        textButton="Зарегистрироваться"
        textRegistr="Уже зарегистрированны?"
        textLogin="Войти"
        link="/signin"
      ></PopupForm>
    </>
  );
}
