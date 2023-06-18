import React from 'react';
import Style from './PopupForm.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectForm,
  setValue,
  resetValues,
} from '../../redax/slices/formSlice';

export default function PopupForm({
  title,
  textButton,
  textRegistr,
  textLogin,
  link,
  handlelSubmit,
}) {
  const dispatch = useDispatch();
  const { value, errors, valid } = useSelector(selectForm);
  return (
    <div className={Style.conteiner}>
      <Link to={'/'}>
        <div className={Style.logo}></div>
      </Link>
      <h1>{title}</h1>
      <form onSubmit={(evt) => handlelSubmit(evt)} className={Style.form}>
        <div className={Style.input_conteiner}>
          {window.location.pathname === '/signup' && (
            <>
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
                minLength="3"
                maxLength="30"
              />
              <span>{errors.name}</span>
            </>
          )}
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
      </form>
      <div className={Style.button_auth}>
        <p className={Style.discription}>{textRegistr}</p>
        <Link to={link}>
          <p
            onClick={() => dispatch(resetValues())}
            className={Style.button_login}
          >
            {textLogin}
          </p>
        </Link>
      </div>
    </div>
  );
}
