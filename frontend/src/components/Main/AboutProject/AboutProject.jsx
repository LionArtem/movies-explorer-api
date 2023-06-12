import React from 'react';
import Style from './AboutProject.module.scss';

export default function AboutProject() {
  return (
    <div id='about-project' className={Style.conteiner}>
      <div className={Style.title}>
        <h2>О проекте</h2>
      </div>
      <div className={Style.description}>
        <h3>Дипломный проект включал 5 этапов</h3>
        <h3>На выполнение диплома ушло 5 недель</h3>
        <p>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className={Style.plan}>
        <div className={Style.one_week}>
          <p>1 неделя</p>
        </div>
        <div className={Style.four_week}>
          <p>4 недели</p>
        </div>
        <p>back-end</p>
        <p>front-end</p>
      </div>
    </div>
  );
}
