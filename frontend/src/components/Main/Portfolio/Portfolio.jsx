import React from 'react';
import Style from './Portfolio.module.scss';

import { listWebsite } from '../../../utils/constants';

export default function Portfolio() {
  return (
    <div className={Style.conteiner}>
      <h2>Портфолио</h2>
      <ul>
        {listWebsite.map((obj, i) => (
          <li className={Style.list_website} key={i}>
            <a target="_blank" rel="noreferrer" href={obj.link}>
              {obj.title}
            </a>
            <div></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
