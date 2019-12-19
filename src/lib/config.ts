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
  verbose: boolean;
}

const env = envalid.cleanEnv(process.env, {
  POSTGRESQL_URI: str(),
  AMQP_URI: str(),
  BRIDGE_CHANNELS: str(),
  VERBOSE: bool({ default: false })
});

const config: Config = {
  amqpUrl: env.AMQP_URI,
  databaseUrl: env.POSTGRESQL_URI,
  bridgeChannels: env.BRIDGE_CHANNELS,
  verbose: env.VERBOSE
};

export default config;
