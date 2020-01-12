import config from './lib/config';
import { createPublisher } from './lib/publisher';
import { registerListener } from './lib/listener';
import { createAcker } from './lib/acker';

const main = async () => {
  const bridges = config.bridgeChannels.split(',');

  for (let bridge of bridges) {
    try {
      const [pgChannel, amqpExhange] = bridge.split(':');

      const publisher = await createPublisher(amqpExhange);
      const acker = createAcker();

      await registerListener(pgChannel, [publisher, acker]);
      console.log(
        `Ready to accept messages on pg channel ${pgChannel} – forwarding to exchange ${amqpExhange}`
      );
    } catch (ex) {
      console.error(ex);
      process.exit(1);
    }
  }
};

main();
