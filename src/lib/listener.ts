import { Notification } from 'pg';
import config from './config';
import createSubscriber from 'pg-listen';

const subscriber = createSubscriber(
  { connectionString: config.databaseUrl },
  // by default, pg-listen assumes your payload is JSON
  // we use a custom format - ${routingKey}|${jobPayload}
  // parsing this format is handled elsewhere in in the publisher / acker
  { parse: s => s }
);

process.on('exit', () => {
  subscriber.close();
});

type Listener = (msg: Notification) => void;

export const registerListener = async (channel: string, fns: Listener[]) => {
  for (let fn of fns) {
    subscriber.events.on('notification', fn);
  }

  subscriber.events.on('error', (err: Error) => {
    console.error('Client got fatal error', err);
    console.log('Shutting down...');
    process.exit(1);
  });

  await subscriber.connect();
  await subscriber.listenTo(channel);

  console.log(`Listening for messages updates on pg channel ${channel}`);
};
