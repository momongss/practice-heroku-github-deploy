import { Router } from 'express';
import Logger from '../loaders/logger.js';
import { authenticate } from '../services/auth.js';

const authRouter = Router();

authRouter.get('/', function (req, res, next) {
  const { isLogined, name } = req.session;
  if (isLogined) {
    res.redirect('back');
  } else {
    res.render('loginPage');
  }
});

authRouter.post('/', function (req, res, next) {
  try {
    const credentials = {
      email: req.body.email,
      pwd: req.body.pwd,
    };

    authenticate(credentials, (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(401).json();

      req.session.isLogined = true;
      req.session.name = user.name;
      return res.status(200).json();
    });
  } catch (err) {
    Logger.error('Error %o', err);
    next(err);
  }
});

export default authRouter;
