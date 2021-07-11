import { Router } from 'express';
import users from './users.js';
import auth from './auth.js';
import singUpRouter from './signUpRoute.js';

const router = Router();

router.get('/', function (req, res, next) {
  const { isLogined, name } = req.session;
  if (isLogined) {
    res.render('initPage', { dispname: name });
  } else {
    res.render('initPage');
  }
});

router.use('/auth', auth);
router.use('/users', users);

router.use('/sign-up', singUpRouter);

export default router;
