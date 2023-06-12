import React from 'react';

import Style from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={Style.root}>
      <div className={Style.title}>
        <p>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className={Style.conteiner_footer}>
        <p className={Style.date}>&copy; {new Date().getFullYear()}</p>
        <div>
          <p>Яндекс.Практикум</p>
          <p>Github</p>
        </div>
      </div>
    </div>
  );
}
