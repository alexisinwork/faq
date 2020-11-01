import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import testDBRouter from './routes/testDB.mjs';
import ordersRouter from './routes/orders.mjs';
import pageViewsRouter from './routes/pageViews.mjs';

import * as config from './config';

const dirname = path.resolve();
const app = express();

// Connecting to MongoDB
const uri = 'mongodb+srv://alexito:uZ79t70lNgNEO7iU@cluster0.xrvfj.mongodb.net/faq?retryWrites=true&w=majority';
mongoose.connect(uri);

// view engine setup
app.set('views', path.join(dirname, 'src/views'));
app.set('view engine', 'jade');

// adding Helmet to enhance your API's security
app.use(helmet());

// Rate Limiting
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
  message: 'Too many requests', // message to send
});
app.use('/', limit); // Setting limiter on specific route
app.use('/api/orders', limit); // Setting limiter on specific route
app.use('/api/page-views', limit); // Setting limiter on specific route

// Body limit is 10 for the body payload using body-parser
app.use(express.json({ limit: '10kb' }));

// Data Sanitization against XSS
app.use(xss());

// Sanitize against NoSQL Injection Attacks
app.use(mongoSanitize());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// Logging data
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

app.use('/db', testDBRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/page-views', pageViewsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.PORT, () => () => console.log(`Example app listening on port ${port}!`));

export default app;
