import envalid from 'envalid';
const { str, bool } = envalid;

enum LogLevel {
  Info = 'info',
  Debug = 'debug'
}

interface Config {
  databaseUrl: string;
  amqpUrl: string;
  bridgeChannels: string;
  publishPersistent: boolean;
  verbose: boolean;
}

const env = envalid.cleanEnv(process.env, {
  POSTGRESQL_URI: str(),
  AMQP_URI: str(),
  BRIDGE_CHANNELS: str(),
  PUBLISH_PERSISTENT: bool({ default: true }),
  VERBOSE: bool({ default: false })
});

const config: Config = {
  amqpUrl: env.AMQP_URI,
  databaseUrl: env.POSTGRESQL_URI,
  bridgeChannels: env.BRIDGE_CHANNELS,
  publishPersistent: env.PUBLISH_PERSISTENT,
  verbose: env.VERBOSE
};

export default config;
