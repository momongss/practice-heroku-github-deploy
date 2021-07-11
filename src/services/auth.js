import userDb from '../models/users.js';
import bcrypt from 'bcrypt';

export function authenticate({ email, pwd }, callback) {
  userDb.findOne({ email }, function (err, doc) {
    if (err) return callback(err);

    if (doc && !passwordMatch(doc.pwd, pwd)) return callback(null, null);
    return callback(null, doc);
  });
}

function passwordMatch(originPwd, newPwd) {
  return bcrypt.compareSync(newPwd, originPwd);
}
