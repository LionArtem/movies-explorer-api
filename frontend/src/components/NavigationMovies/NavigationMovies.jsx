import React from 'react';

import Style from './NavigationMovies.module.scss';
import { Link } from 'react-router-dom';
import BurgerMain from '../BurgerMain/BurgerMain';

export default function Navigationmovies() {
  const [stateMainBurger, isStateMainBurger] = React.useState(false);
  return (
    <>
      <div className={Style.conteiner}>
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
        <div
          onClick={() => isStateMainBurger(true)}
          className={Style.burger}
        ></div>
      </div>
      {stateMainBurger && <BurgerMain isStateMainBurger={isStateMainBurger} />}
    </>
  );
}
