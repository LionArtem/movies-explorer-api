import React from 'react';
import Style from './Header.module.scss';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <div className={Style.conteiner}>
      <Navigation />
    </div>
  );
}
