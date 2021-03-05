import { createAcker } from './lib/acker';
import config from './lib/config';
import { registerListener } from './lib/listener';
import logger from './lib/logger';
import { createPublisher } from './lib/publisher';

const main = async () => {
  const bridges = config.bridgeChannels.split(',');

  for (const bridge of bridges) {
    try {
      const [pgChannel, amqpExhange] = bridge.split(':');

      const publisher = await createPublisher(amqpExhange);
      const acker = createAcker();

      await registerListener(pgChannel, [publisher, acker]);
      logger.info(
        `Ready to accept messages on pg channel ${pgChannel} – forwarding to exchange ${amqpExhange}`
      );
    } catch (err) {
      logger.error(`Error setting up channel ${bridge}: `, err);
      process.exit(1);
    }
  }
};

main();
