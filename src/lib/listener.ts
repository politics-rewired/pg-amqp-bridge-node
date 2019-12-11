import { Client, Notification } from 'pg';
import config from './config';

const client = new Client({ connectionString: config.databaseUrl });
type Listener = (msg: Notification) => void;

export const registerListener = async (channel: string, fns: Listener[]) => {
  for (let fn of fns) {
    client.on('notification', fn);
  }

  client.on('error', (err: Error) => {
    console.error('Client got error', err);
    console.log('Shutting down');
    process.exit();
  });

  await client.connect();
  await client.query(`LISTEN ${channel}`);
  console.log(`Listening for messages updates on pg channel ${channel}`);
};
