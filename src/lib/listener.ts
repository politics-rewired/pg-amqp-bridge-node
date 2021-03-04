import { Notification } from 'pg';
import config from './config';
import createSubscriber from 'pg-listen';

type Listener = (msg: Notification) => void;

export const registerListener = async (channel: string, fns: Listener[]) => {
  console.log(`Attempting to connect to ${channel}`);

  const subscriber = createSubscriber(
    { connectionString: config.databaseUrl },
    // by default, pg-listen assumes your payload is JSON
    // we use a custom format - ${routingKey}|${jobPayload}
    // parsing this format is handled elsewhere in in the publisher / acker
    { parse: s => s }
  );

  for (let fn of fns) {
    subscriber.events.on('notification', fn);
  }

  subscriber.events.on('error', (err: Error) => {
    console.error('Client got fatal error', err);
    console.log('Shutting down...');
    process.exit();
  });

  subscriber.events.on('reconnect', attempt => {
    console.log(`Attempting reconnect - attempt ${attempt}`);
  });

  await subscriber.connect();
  await subscriber.listenTo(channel);

  console.log(`Listening for messages updates on pg channel ${channel}`);
};
