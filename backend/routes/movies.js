const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regularLink } = require('../utils/constants');
const {
  createMovies,
  getMovies,
  deleteMovies,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.post(
  '/',
  celebrate({
    body: Joi.object()
      .keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required().pattern(regularLink),
        trailerLink: Joi.string().required().pattern(regularLink),
        thumbnail: Joi.string().required().min(2).pattern(regularLink),
        movieId: Joi.number().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
      }),
  }),
  createMovies,
);

moviesRouter.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteMovies,
);

module.exports = moviesRouter;
