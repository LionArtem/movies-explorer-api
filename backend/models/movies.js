const mongoose = require('mongoose');
const { regularLink } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regularLink.test(v),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regularLink.test(v),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regularLink.test(v),
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
