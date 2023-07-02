import React from 'react';
import Style from './FilterCheckbox.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { isStateTogl, selectMovies } from '../../../redax/slices/MoviesSlice';

export default function FilterCheckbox() {
  const dispatch = useDispatch();
  const { stateTogl } = useSelector(selectMovies);
  console.log(stateTogl);
  return (
    <section className={Style.conteiner}>
      <div
        onClick={() => dispatch(isStateTogl())}
        className={`${Style.checkbox} ${
          stateTogl ? Style.checkbox_on : Style.checkbox_off
        }`}
      ></div>
      <p>Короткометражки</p>
    </section>
  );
}
