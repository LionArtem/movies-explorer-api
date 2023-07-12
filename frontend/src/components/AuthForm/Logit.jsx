import React from 'react';
import { useNavigate } from 'react-router-dom';

import PopupForm from '../PopupForm/PopupForm';

import { useSelector, useDispatch } from 'react-redux';
import {
  resetValues,
  setValid,
} from '../../redax/slices/formValidetionSlice';
import {
  fetchLoginUser,
  selectAuth,
  remuveErrMessage,
} from '../../redax/slices/authSlice';

export default function Logit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errMessage, textButtonLogin } = useSelector(selectAuth);

  const handlelSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchLoginUser())
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/movies', { replace: true });
          dispatch(resetValues());
          dispatch(setValid());
        }
      })
      .finally(dispatch(remuveErrMessage()));
  };
  return (
    <>
      <PopupForm
        title={'Добро пожаловать!'}
        textButton={textButtonLogin}
        textRegistr="Ещё не зарегистрированны?"
        textLogin="Регистрация"
        link="/signup"
        handlelSubmit={handlelSubmit}
        errMessage={errMessage}
        remuveErrMessage={remuveErrMessage}
      ></PopupForm>
    </>
  );
}
