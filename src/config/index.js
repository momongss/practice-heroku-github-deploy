import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config();
  if (envFound.error) throw new Error("Couldn't find .env file");
}

export default {
  port: 8000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  reqAddress: process.env.REQ_ADDRESS,
  api: {
    prefix: '/baemin',
  },
  dataPath: process.env.DATA_PATH,
};
