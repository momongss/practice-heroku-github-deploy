import express from 'express';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import config from '../config/index.js';
import routes from '../routes/index.js';

export default (app) => {
  /* view engine setup */
  const __dirname = path.resolve();
  app.set('views', path.join(__dirname, 'src/views'));
  app.set('view engine', 'pug');

  /* REQUEST DATA */
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    }),
  );

  /* set static path */
  app.use(express.static('src/public'));

  /* Morgan Request Logger */
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  /* session */
  let sess = {
    secret: 'sEsSiOnSeCrEtKeY',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
  }

  app.use(session(sess));

  /* ROUTER */
  app.get('/', (req, res) => {
    res.redirect(config.api.prefix);
  });

  app.use(config.api.prefix, routes);

  /* catch 404 and forward to error handler */
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /* error handler */
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
