const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsersMe, patchUsersInfo } = require('../controllers/users');

usersRouter.get('/me', getUsersMe);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  patchUsersInfo,
);

module.exports = usersRouter;
