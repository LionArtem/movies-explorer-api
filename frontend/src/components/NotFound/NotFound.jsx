import React from 'react';
import Style from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div>
      <p className={Style.title}>404</p>
      <p className={Style.discription}>Страница не найдена</p>
      <p className={Style.button}>Назад</p>
    </div>
  );
}
