// tslint:disable-next-line: no-var-requires
require('dotenv').config();
import envalid from 'envalid';
const { str, bool } = envalid;

interface Config {
  databaseUrl: string;
  amqpUrl: string;
  bridgeChannels: string;
  publishPersistent: boolean;
  logLevel: string;
}

const env = envalid.cleanEnv(process.env, {
  AMQP_URI: str(),
  BRIDGE_CHANNELS: str(),
  LOG_LEVEL: str({
    default: 'info',
    devDefault: 'debug'
  }),
  POSTGRESQL_URI: str(),
  PUBLISH_PERSISTENT: bool({ default: true })
});

const config: Config = {
  amqpUrl: env.AMQP_URI,
  bridgeChannels: env.BRIDGE_CHANNELS,
  databaseUrl: env.POSTGRESQL_URI,
  logLevel: env.LOG_LEVEL,
  publishPersistent: env.PUBLISH_PERSISTENT
};

export default config;
