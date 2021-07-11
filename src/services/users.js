import userDb from '../models/users.js';
import bcrypt from 'bcrypt';

export const createUser = async (user, callback) => {
  user = await encryptPassword(user);
  userDb.insert(user, function (err, newDoc) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, newDoc);
  });
};

const encryptPassword = async (user) => {
  const saltRounds = 10;
  const encryptedPw = await bcrypt.hash(user.pwd, saltRounds);
  user.pwd = encryptedPw;
  return user;
};
