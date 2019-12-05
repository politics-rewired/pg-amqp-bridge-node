import { Client } from 'pg';
import config from './config';

const client = new Client({ connectionString: config.databaseUrl });

export const registerListener = async (channel: string, fn) => {
  client.on('notification', fn);
  await client.connect();
  await client.query(`LISTEN ${channel}`);
  console.log(`Listening for messages updates on pg channel ${channel}`);
};
