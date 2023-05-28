require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const RepeatsEmailError = require('../errors/repeats-email-err');
const IncorrectErr = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');
const NotauthorizationError = require('../errors/authorization-err');

const createUsers = (req, res, next) => {
  const { name, email, password } = req.body;
  // получим из объекта запроса имя и описание пользователя
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((newUser) => {
        const newUserNoPassword = newUser.toObject();
        delete newUserNoPassword.password;
        res.send(newUserNoPassword);
      })
      .catch((err) => {
        if (err.code === 11000) {
          const error = new RepeatsEmailError(
            'Пользователь с таким email зарегистрирован',
          );
          next(error);
        } else {
          next(err);
        }
      }));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new NotauthorizationError('Неправильные почта или пароль'),
        );
        // пользователь с такой почтой не найден
      }
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(
              new NotauthorizationError('Неправильные почта или пароль'),
            );
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
            { expiresIn: '7d' },
          );
          res.send({ token });
        })
        .catch((err) => {
          next(err);
        });
      // пользователь найден
    })
    .catch((err) => {
      next(err);
    });
};

const getUsersMe = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      throw new NotFoundError('пользователь не найден');
    })
    .catch(next);
};

const patchUsersInfo = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findById(id).then((user) => {
    if (user) {
      if (user.email === email) {
        throw new RepeatsEmailError('не корректные данные: ввидите новый email');
      }
      User.findByIdAndUpdate(
        id,
        { name, email },
        {
          new: true, // обработчик then получит на вход обновлённую запись
          runValidators: true,
        },
      )
        .then((patchUser) => {
          res.send(patchUser);
        }).catch((err) => {
          if (err.code === 11000) {
            const error = new RepeatsEmailError(
              'Пользователь с таким email зарегистрирован',
            );
            next(error);
          } else {
            next(err);
          }
        });
      return;
    }
    throw new NotFoundError('пользователь не найден');
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const erros = new IncorrectErr('Некорректный данные');
        next(erros);
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUsers,
  getUsersMe,
  patchUsersInfo,
  login,
};
