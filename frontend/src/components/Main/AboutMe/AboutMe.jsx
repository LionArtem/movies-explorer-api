import React from 'react';
import Style from './AboutMe.module.scss';

import foto from '../../../image/0UsrhZgf5d0.jpg';

export default function AboutMe() {
  return (
    <div id="about-me" className={Style.conteiner}>
      <div className={Style.title}>
        <h2>Студент</h2>
      </div>
      <div className={Style.conteiner_about}>
        <div className={Style.conteiner_text}>
          <div>
            <h2>Artem</h2>
            <h3>Фронтенд-разработчик, 34 лет</h3>
            <p>
              Я родился и живу в городе Липецк, закончил много чего. У меня есть
              жена,сын,кошка и другие домашние животные. Я не люблю слушать
              музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С какого-то
              года работаю в корпорации «НЛМК». После того, как прошёл курс по
              веб-разработке, понял что этого не достаточно чтобы заниматься
              фриланс-заказами и уйти с постоянной работы.
            </p>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/LionArtem"
          >
            GitHab
          </a>
        </div>
        <img src={foto} alt="фото студента" />
      </div>
    </div>
  );
}
