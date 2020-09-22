import amqplib from 'amqplib';
import config from './config';
import { Notification } from 'pg';

export const createPublisher = async exchange => {
  const connection = await amqplib.connect(config.amqpUrl);
  const channel = await connection.createChannel();

  return (message: Notification) => {
    const messageStr = JSON.stringify(message);

    if (!message.payload) {
      const now = new Date().toISOString();
      console.log(
        `${now} WARN encountered empty payload for message: ${messageStr}`
      );
      return;
    }

    try {
      const splitByBar = message.payload.split('|');
      const routingKey = splitByBar[0];
      const stringContents = splitByBar.slice(1).join('|');
      const contents = Buffer.from(stringContents);

      if (config.verbose) {
        const now = new Date().toISOString();
        console.log(
          `${now} INFO Forwarding message to ${routingKey}: ${stringContents}`
        );
      }

      channel.publish(exchange, routingKey, contents);
    } catch (err) {
      const now = new Date().toISOString();
      console.log(
        `${now} ERROR encountered error publishing message: ${err.message}. Message: ${messageStr}`
      );
    }
  };
};
