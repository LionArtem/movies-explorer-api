import React from 'react';
import { useNavigate } from 'react-router-dom';

import Style from './NotFound.module.scss';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <p className={Style.title}>404</p>
      <p className={Style.discription}>Страница не найдена</p>
      <p onClick={() => navigate(-1)} className={Style.button}>
        Назад
      </p>
    </div>
  );
}
