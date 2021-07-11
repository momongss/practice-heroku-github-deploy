import express from 'express';
import config from './config/index.js';
import loadApp from './loaders/index.js';
import Logger from './loaders/logger.js';

async function startServer() {
  const app = express();

  await loadApp(app);
  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();
