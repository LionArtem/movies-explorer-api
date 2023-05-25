const router = require('express').Router();
const cardsRouter = require('./movies');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/movies', cardsRouter);

module.exports = router;
