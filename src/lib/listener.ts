import { Client, Notification } from 'pg';
import config from './config';
import createSubscriber from 'pg-listen';

const client = new Client({ connectionString: config.databaseUrl });
const subscriber = createSubscriber(
  { connectionString: config.databaseUrl },
  { parse: s => s }
);

type Listener = (msg: Notification) => void;

export const registerListener = async (channel: string, fns: Listener[]) => {
  for (let fn of fns) {
    subscriber.events.on('notification', fn);
  }

  subscriber.events.on('error', (err: Error) => {
    console.error('Client got fatal error', err);
    console.log('Shutting down...');
    process.exit();
  });

  await subscriber.connect();
  await subscriber.listenTo(channel);
};
