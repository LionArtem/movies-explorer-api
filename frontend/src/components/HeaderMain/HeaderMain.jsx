import React from 'react';
import Style from './HeaderMain.module.scss';
import { Link } from 'react-router-dom';

export default function HeaderMain() {
  return (
    <header className={Style.conteiner}>
      <div className={Style.logo}></div>
      <div className={Style.auth}>
        <Link to={'/signup'}>
          <p className={Style.registr}>Регистрация</p>
        </Link>
        <Link className={Style.sign} to={'/signin'}>
          <p>Войти</p>
        </Link>
      </div>
    </header>
  );
}
