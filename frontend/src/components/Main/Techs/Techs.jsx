import React from 'react';
import Style from './Techs.module.scss';

import { listTechs } from '.././../../utils/constants';

export default function Techs() {
  return (
    <section id='techs' className={Style.conteiner}>
      <div className={Style.title}>
        <h2>Технологии</h2>
      </div>
      <h3>7 технологий</h3>
      <p>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className={Style.list_techs}>
        {listTechs.map((tech, i) => (
          <li key={i}>
            <p>{tech}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
