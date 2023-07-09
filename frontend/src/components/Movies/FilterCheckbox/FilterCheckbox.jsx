import React from 'react';
import Style from './FilterCheckbox.module.scss';
import { useDispatch } from 'react-redux';

export default function FilterCheckbox({ stateTogl, isStateTogl }) {
  const dispatch = useDispatch();
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
