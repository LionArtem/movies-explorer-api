import React from 'react';
import Style from './FilterCheckbox.module.scss';

export default function FilterCheckbox() {
  return (
    <div className={Style.checkbox_conteiner}>
      <div className={Style.checkbox_on}></div>
      <p>Короткометражки</p>
    </div>
  );
}
