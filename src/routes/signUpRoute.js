import { Router } from 'express';

const singUpRouter = Router();

singUpRouter.get('/info', function (req, res, next) {
  res.render('signUpInfo');
});

singUpRouter.get('/phone', function (req, res, next) {
  res.render('signUpPhone');
});

singUpRouter.get('/agree', function (req, res, next) {
  res.render('signUpAgree');
});

export default singUpRouter;
