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
  POSTGRESQL_URI: str(),
  PUBLISH_PERSISTENT: bool({ default: true }),
  LOG_LEVEL: str({
    default: 'info',
    devDefault: 'debug'
  })
});

const config: Config = {
  amqpUrl: env.AMQP_URI,
  bridgeChannels: env.BRIDGE_CHANNELS,
  databaseUrl: env.POSTGRESQL_URI,
  publishPersistent: env.PUBLISH_PERSISTENT,
  logLevel: env.LOG_LEVEL
};

export default config;
