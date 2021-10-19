import { Notification } from 'pg';
import createSubscriber from 'pg-listen';

import config from './config';
import logger from './logger';

type Listener = (msg: Notification) => void;

export const registerListener = async (channel: string, fns: Listener[]) => {
  logger.info(`Attempting to connect to ${channel}`);

  const subscriber = createSubscriber(
    { connectionString: config.databaseUrl },
    // by default, pg-listen assumes your payload is JSON
    // we use a custom format - ${routingKey}|${jobPayload}
    // parsing this format is handled elsewhere in in the publisher / acker
    { parse: (s) => s }
  );

  for (const fn of fns) {
    subscriber.events.on('notification', fn);
  }

  subscriber.events.on('error', (err: Error) => {
    logger.error('Client got fatal error: ', err);
    logger.info('Shutting down...');
    process.exit(1);
  });

  subscriber.events.on('reconnect', (attempt) => {
    logger.info(`Attempting reconnect - attempt ${attempt}`);
  });

  await subscriber.connect();
  await subscriber.listenTo(channel);

  logger.info(`Listening for messages updates on pg channel ${channel}`);

  process.on('exit', () => {
    subscriber.close();
  });
};
