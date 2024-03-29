import React from 'react';
import Style from './PopupForm.module.scss';
import { Link } from 'react-router-dom';

export default function PopupForm({
  title,
  textButton,
  textRegistr,
  textLogin,
  link,
  handlelSabmit,
}) {
  return (
    <div className={Style.conteiner}>
      <Link to={'/'}>
        <div className={Style.logo}></div>
      </Link>
      <h1>{title}</h1>
      <form className={Style.form}>
        <div className={Style.input_conteiner}>
          {window.location.pathname === '/signup' && (
            <>
              <label>Имя</label>
              <input required defaultValue="artem" />
              <span></span>
            </>
          )}
          <label>Email</label>
          <input required type="email" defaultValue="artem@mail.ru" />
          <span></span>
          <label>Пароль</label>
          <input
            required
            className={Style.input_password}
            type="password"
            defaultValue="12381238"
          ></input>
          <span>Что-то пошло не так...</span>
        </div>
        <button onClick={(e) => handlelSabmit(e)}>{textButton}</button>
      </form>
      <div className={Style.button_auth}>
        <p className={Style.discription}>{textRegistr}</p>
        <Link to={link}>
          <p className={Style.button_login}>{textLogin}</p>
        </Link>
      </div>
    </div>
  );
}
