import React from 'react';
import Style from './BurgerMain.module.scss';
import { Link } from 'react-router-dom';

export default function BurgerMain({ closeBurgerPopup }) {
  const closeOverley = (evt) => {
    if (evt.target === evt.currentTarget) closeBurgerPopup();
  };
  return (
    <section>
      <div onClick={(evt) => closeOverley(evt)} className={Style.overley}></div>
      <div className={Style.main}>
        <div onClick={() => closeBurgerPopup()} className={Style.close}></div>
        <nav>
          <ul>
            <li
              onClick={() => closeBurgerPopup()}
              className={
                window.location.pathname === '/' ? Style.link_activ : ''
              }
            >
              <Link to={'/'}>Главная</Link>
            </li>
            <li
              onClick={() => closeBurgerPopup()}
              className={
                window.location.pathname === '/movies' ? Style.link_activ : ''
              }
            >
              <Link to={'/movies'}>Фильмы</Link>
            </li>
            <li
              onClick={() => closeBurgerPopup()}
              className={
                window.location.pathname === '/saved-movies'
                  ? Style.link_activ
                  : ''
              }
            >
              <Link to={'/saved-movies'}>Сохраненные фильмы</Link>
            </li>
            <li
              onClick={() => closeBurgerPopup()}
              className={Style.user_conteiner}
            >
              <p className={Style.user}>
                <Link to={'/profile'}>Аккаунт</Link>
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
