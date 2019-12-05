import amqplib from 'amqplib';
import config from './config';
import { Notification } from 'pg';

export const createPublisher = async exchange => {
  const connection = await amqplib.connect(config.amqpUrl);
  const channel = await connection.createChannel();

  return (message: Notification) => {
    const splitByBar = message.payload.split('|');
    const routingKey = splitByBar[0];
    const stringContents = splitByBar.slice(1).join('|');
    const contents = Buffer.from(stringContents);

    if (config.verbose) {
      console.log(`Forwarding message to ${routingKey}: ${stringContents}`);
    }

    channel.publish(exchange, routingKey, contents);
  };
};
