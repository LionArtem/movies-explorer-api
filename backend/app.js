require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const sigRouter = require('./routes/sig');
const NotFoundError = require('./errors/not-found-err');
const centralErrorHandling = require('./middlewares/centralErrorHandling');

const { PORT = 3000, DATABASE__PORT, DATABASA__NAME } = process.env;
const app = express();

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect(`mongodb://${DATABASE__PORT}/${DATABASA__NAME}`);

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { DOMEN, DOMEN_ENV } = process.env;
  if (DOMEN_ENV === 'production') {
    if (`https://${DOMEN}` === origin) {
      // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
      res.header('Access-Control-Allow-Origin', origin);
    }
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use('/', sigRouter);

app.use(auth);

app.use('/', router);

app.use((req, res, next) => {
  const err = new NotFoundError('адресс не существует');
  next(err);
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(centralErrorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
