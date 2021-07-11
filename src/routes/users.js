import { Router } from 'express';
import Logger from '../loaders/logger.js';
import { createUser } from '../services/users.js';

const userRouter = Router();

userRouter.post('/', function (req, res, next) {
  const { email, name, pwd, birthDate } = req.body;
  const user = {
    email,
    name,
    pwd,
    birthDate,
  };

  try {
    createUser(user, (err, result) => {
      if (err) {
        res.status(500).json();
        return;
      }
      res.status(200).json();
    });
  } catch (err) {
    Logger.error('Error %o', err);
    next(err);
  }
});

export default userRouter;
