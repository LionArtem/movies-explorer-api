const Movies = require('../models/movies');

const IncorrectErr = require('../errors/incorrect-err');
const NotFoundError = require('../errors/not-found-err');
const NoAccessErr = require('../errors/no-access-err');

const createMovies = (req, res, next) => {
  const id = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: id,
  })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new IncorrectErr('Не корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movies.find()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteMovies = (req, res, next) => {
  const { id } = req.params;
  const idUser = req.user._id;
  Movies.findById(id)
    .then((cardFind) => {
      if (!cardFind) {
        const err = new NotFoundError('карточка с таким id не найдена');
        next(err);
        return;
      }
      const idOwner = cardFind.owner.toString();
      if (idOwner === idUser) {
        cardFind.deleteOne()
          .then((card) => {
            res.send(card);
          }).catch((err) => {
            next(err);
          });
      } else {
        const err = new NoAccessErr('нельзя удалить чужую карточку');
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError('Не корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovies,
  getMovies,
  deleteMovies,
};
