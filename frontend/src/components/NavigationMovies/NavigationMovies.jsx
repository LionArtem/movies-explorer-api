import React from 'react';

import Style from './NavigationMovies.module.scss';
import { Link } from 'react-router-dom';
import BurgerMain from '../BurgerMain/BurgerMain';

export default function Navigationmovies() {
  const [stateMainBurger, isStateMainBurger] = React.useState(false);
  const body = document.getElementById('body');

  const openBurgerPopup = () => {
    isStateMainBurger(!stateMainBurger);
    body.classList.add('bodyNotScrolling');
  };

  const closeBurgerPopup = () => {
    isStateMainBurger(!stateMainBurger);
    body.classList.remove('bodyNotScrolling');
  };

  return (
    <>
      <section className={Style.conteiner}>
        <Link to={'/'}>
          <div className={Style.logo}></div>
        </Link>
        <div className={Style.movies}>
          <Link to={'/movies'}>
            <p>Фильмы</p>
          </Link>
          <Link to={'/saved-movies'}>
            <p>Сохраненные фильмы</p>
          </Link>
        </div>
        <div className={Style.user_conteiner}>
          <Link to={'/profile'}>
            <p className={Style.user}>Aккаунт</p>
          </Link>
        </div>
        <div onClick={() => openBurgerPopup()} className={Style.burger}></div>
      </section>
      {stateMainBurger && <BurgerMain closeBurgerPopup={closeBurgerPopup} />}
    </>
  );
}
