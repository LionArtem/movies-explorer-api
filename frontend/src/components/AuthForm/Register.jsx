import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectformValidetion,
  resetValues,
  setValid,
  setValue,
} from '../../redax/slices/formValidetionSlice';
import {
  selectRegistration,
  addErrMessage,
  setTextButton,
  addUser,
  setLoggedIn,
  remuveErrMessage,
  fetchAddUser,
} from '../../redax/slices/registrationSlice';
import { auth } from '../../utils/Auth';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value, errors } = useSelector(selectformValidetion);
  const { textButton } = useSelector(selectRegistration);

  const handlelSubmit = (evt) => {
    dispatch(setTextButton('Регистрация...'));
    evt.preventDefault();
    dispatch(fetchAddUser())
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/movies', { replace: true });
          dispatch(resetValues());
          dispatch(setValid());
        }
      })
      .finally(
        dispatch(setTextButton('Зарегистрироваться')),
        dispatch(remuveErrMessage())
      );
    // auth
    //   .addUser(name, email, password)
    //   .then((res) => {
    //     dispatch(addUser({ name: res.name, email: res.email }));
    //     dispatch(setLoggedIn());
    //     navigate('/movies', { replace: true });
    //     dispatch(resetValues());
    //     dispatch(setValid());
    //   })
    //   .catch((err) => {
    //     dispatch(addErrMessage(err.errMessage));
    //   })
    //   .finally(
    //     dispatch(setTextButton('Зарегистрироваться')),
    //     dispatch(remuveErrMessage())
    //   );
  };

  return (
    <>
      <PopupForm
        title={'Рады видеть!'}
        textButton={textButton}
        textRegistr="Уже зарегистрированны?"
        textLogin="Войти"
        link="/signin"
        handlelSubmit={handlelSubmit}
      >
        <label>Имя(формат:латиница, кириллица, пробел, дефис)</label>
        <input
          pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
          name="name"
          onChange={(evt) =>
            dispatch(
              setValue({
                value: evt.target.value,
                name: evt.target.name,
                errors: evt.target.validationMessage,
                valid: evt.target.closest('form').checkValidity(),
              })
            )
          }
          value={value.name ? value.name : ''}
          required
          minLength="2"
          maxLength="30"
        />
        <span>{errors.name}</span>
      </PopupForm>
    </>
  );
}
