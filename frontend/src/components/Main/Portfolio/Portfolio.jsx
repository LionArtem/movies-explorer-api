import React from 'react';
import Style from './Portfolio.module.scss';

import { listWebsite } from '../../../utils/constants';

export default function Portfolio() {
  return (
    <section className={Style.conteiner}>
      <h2>Портфолио</h2>
      <ul>
        {listWebsite.map((obj, i) => (
          <a target="_blank" rel="noreferrer" href={obj.link}>
            <li className={Style.list_website} key={i}>
              <h3 className={Style.title}>{obj.title}</h3>
              <div></div>
            </li>
          </a>
        ))}
      </ul>
    </section>
  );
}
