import React from 'react';

import Style from './HeaderMovies.module.scss';
import NavigationMovies from '../../NavigationMovies/NavigationMovies';

export default function HeaderMovies() {
  return (
    <header className={Style.conteiner}>
      <NavigationMovies />
    </header>
  );
}
