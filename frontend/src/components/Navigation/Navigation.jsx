import React from 'react';
import { Link } from 'react-router-dom';

import Style from './Navigation.module.scss';

export default function Navigation() {
  return (
    <div className={Style.conteiner}>
      <div className={Style.logo}></div>
      <div className={Style.auth}>
        <Link to={'/signup'}>
          <p className={Style.registr}>Регистрация</p>
        </Link>
        <Link className={Style.sign} to={'/signin'}>
          <p>Войти</p>
        </Link>
      </div>
    </div>
  );
}
