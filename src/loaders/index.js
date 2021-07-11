import expressLoader from './express.js';
import Logger from './logger.js';

export default async (app) => {
  expressLoader(app);
  Logger.info('Express loaded');
};
