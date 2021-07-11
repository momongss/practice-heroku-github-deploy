import Datastore from 'nedb';
import config from '../config/index.js';

const userDb = new Datastore({ filename: `${config.dataPath}/user.db`, autoload: true });

export default userDb;
