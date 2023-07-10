import React from 'react';
import Style from './FilterCheckbox.module.scss';

export default function FilterCheckbox({ stateTogl, isStateTogl }) {
  
  return (
    <section className={Style.conteiner}>
      <div
        onClick={() => isStateTogl()}
        className={`${Style.checkbox} ${
          stateTogl ? Style.checkbox_on : Style.checkbox_off
        }`}
      ></div>
      <p>Короткометражки</p>
    </section>
  );
}
