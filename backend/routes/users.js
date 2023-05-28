const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsersMe, patchUsersInfo } = require('../controllers/users');

usersRouter.get('/me', getUsersMe);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  patchUsersInfo,
);

module.exports = usersRouter;
