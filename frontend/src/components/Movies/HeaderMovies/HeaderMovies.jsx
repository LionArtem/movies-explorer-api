import React from 'react';

import Style from './HeaderMovies.module.scss';
import NavigationMovies from '../../NavigationMovies/NavigationMovies';

export default function HeaderMovies() {
  return (
    <div className={Style.conteiner}>
      <NavigationMovies />
    </div>
  );
}
