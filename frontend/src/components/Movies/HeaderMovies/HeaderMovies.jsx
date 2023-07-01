import React from 'react';

import { Link } from 'react-router-dom';
import BurgerMain from '../../BurgerMain/BurgerMain';

import Style from './HeaderMovies.module.scss';
import { useDispatch } from 'react-redux';
import { resetAnswerRequest } from '../../../redax/slices/userSlice';

export default function HeaderMovies() {
  const dispatch = useDispatch();
  const [stateMainBurger, isStateMainBurger] = React.useState(false);
  const body = document.getElementById('body');

  const openBurgerPopup = () => {
    isStateMainBurger(!stateMainBurger);
    body.classList.add('bodyNotScrolling');
    document.addEventListener('keydown', closeByEscape);
  };

  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      isStateMainBurger(false);
      body.classList.remove('bodyNotScrolling');
      document.removeEventListener('keydown', closeByEscape);
    }
  }

  const closeBurgerPopup = () => {
    isStateMainBurger(!stateMainBurger);
    body.classList.remove('bodyNotScrolling');
    document.removeEventListener('keydown', closeByEscape);
  };
  return (
    <header className={Style.conteiner}>
      <Link to={'/'}>
        <div
          // onClick={() => dispatch(resetAnswerRequest())}
          className={Style.logo}
        ></div>
      </Link>
      <div className={Style.movies}>
        <Link to={'/movies'}>
          <p
            className={`${
              window.location.pathname === '/movies'
                ? Style.text_movie_active
                : Style.text_movie
            }`}
          >
            Фильмы
          </p>
        </Link>
        <Link to={'/saved-movies'}>
          <p
            className={`${
              window.location.pathname === '/saved-movies'
                ? Style.text_movie_active
                : Style.text_movie
            }`}
          >
            Сохраненные фильмы
          </p>
        </Link>
      </div>
      <div className={Style.user_conteiner}>
        <Link to={'/profile'}>
          <p className={Style.user}>Aккаунт</p>
        </Link>
      </div>
      <div onClick={() => openBurgerPopup()} className={Style.burger}></div>
      {stateMainBurger && <BurgerMain closeBurgerPopup={closeBurgerPopup} />}
    </header>
  );
}
