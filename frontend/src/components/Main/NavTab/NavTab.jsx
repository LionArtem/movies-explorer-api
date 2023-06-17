import React from 'react';
import Style from './NavTab.module.scss';

export default function NavTab() {
  return (
    <section className={Style.conteiner}>
      <nav>
        <a href="#about-project">О проекте</a>
        <a href="#techs">Технологии</a>
        <a href="#about-me">Студент</a>
      </nav>
    </section>
  );
}
