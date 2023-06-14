import React from 'react';
import Style from './Promo.module.scss';

export default function Promo() {
  return (
    <section className={Style.conteiner}>
      <div className={Style.landing}></div>
      <div className={Style.overlye}>
        <h1>Учебный проект студента факультета Веб-разработки.</h1>
      </div>
    </section>
  );
}
