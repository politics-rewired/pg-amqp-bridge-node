import winston from 'winston';

import config from './config';

// Winston configuration
const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: config.logLevel,
    }),
  ],
});

export default logger;
