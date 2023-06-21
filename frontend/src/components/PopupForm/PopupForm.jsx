import React from 'react';
import Style from './PopupForm.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectformValidetion,
  resetValues,
  setValid,
  setValue,
} from '../../redax/slices/formValidetionSlice';
import {
  selectRegistration,
  remuveErrMessage,
} from '../../redax/slices/registrationSlice';

export default function PopupForm({
  title,
  textButton,
  textRegistr,
  textLogin,
  link,
  handlelSubmit,
  children,
}) {
  const dispatch = useDispatch();
  const { valid } = useSelector(selectformValidetion);
  const { errMessage } = useSelector(selectRegistration);
  const { value, errors } = useSelector(selectformValidetion);
  return (
    <div className={Style.conteiner}>
      <Link to={'/'}>
        <div
          onClick={() => {
            dispatch(resetValues());
            dispatch(remuveErrMessage());
            dispatch(setValid());
          }}
          className={Style.logo}
        ></div>
      </Link>
      <h1>{title}</h1>
      <form onSubmit={(evt) => handlelSubmit(evt)} className={Style.form}>
        <div className={Style.input_conteiner}>
          {children}
          <label>Email</label>
          <input
            pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z0-9_\-]+"
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
            value={value.email ? value.email : ''}
            name="email"
            required
            type="email"
          />
          <span>{errors.email}</span>
          <label>Пароль</label>
          <input
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
            value={value.password ? value.password : ''}
            name="password"
            required
            className={Style.input_password}
            type="password"
            minLength={8}
            maxLength={20}
          ></input>
          <span>{errors.password}</span>
        </div>
        {valid ? (
          <button type="submit">{textButton}</button>
        ) : (
          <button disabled className={Style.button_off} type="submit">
            {textButton}
          </button>
        )}
        <span className={Style.err_massege}>{errMessage}</span>
      </form>
      <div className={Style.button_auth}>
        <p className={Style.discription}>{textRegistr}</p>
        <Link to={link}>
          <p
            onClick={() => {
              dispatch(resetValues());
              dispatch(remuveErrMessage());
              dispatch(setValid());
            }}
            className={Style.button_login}
          >
            {textLogin}
          </p>
        </Link>
      </div>
    </div>
  );
}
