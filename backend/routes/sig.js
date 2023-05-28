const sigRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUsers, login } = require('../controllers/users');

sigRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUsers,
);

sigRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = sigRouter;
