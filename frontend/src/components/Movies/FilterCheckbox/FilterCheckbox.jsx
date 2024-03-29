import React from 'react';
import Style from './FilterCheckbox.module.scss';

export default function FilterCheckbox() {
  const [stateTogl, isStateTogl] = React.useState(true);
  return (
    <section className={Style.conteiner}>
      <div
        onClick={() => isStateTogl(!stateTogl)}
        className={`${Style.checkbox} ${
          stateTogl ? Style.checkbox_on : Style.checkbox_off
        }`}
      ></div>
      <p>Короткометражки</p>
    </section>
  );
}
