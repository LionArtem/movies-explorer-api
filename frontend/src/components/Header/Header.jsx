import React from 'react';
import Style from './Header.module.scss';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  return (
    <header className={Style.header}>
      <Navigation />
    </header>
  );
}
