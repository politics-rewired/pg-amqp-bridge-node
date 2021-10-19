import amqplib from 'amqplib';
import { Notification } from 'pg';

import config from './config';
import logger from './logger';

export const createPublisher = async (exchange) => {
  const connection = await amqplib.connect(config.amqpUrl);
  const channel = await connection.createChannel();

  return (message: Notification) => {
    const messageStr = JSON.stringify(message);

    if (!message.payload) {
      logger.warn(`Encountered empty payload for message: ${messageStr}`);
      return;
    }

    try {
      const splitByBar = message.payload.split('|');
      const routingKey = splitByBar[0];
      const stringContents = splitByBar.slice(1).join('|');
      const contents = Buffer.from(stringContents);

      logger.debug(`Forwarding message to ${routingKey}: ${stringContents}`);

      const options: amqplib.Options.Publish = {
        persistent: config.publishPersistent,
      };
      channel.publish(exchange, routingKey, contents, options);
    } catch (err) {
      logger.error(`encountered error publishing message: ${err.message}`, {
        messageStr,
      });
    }
  };
};
