import { Notification, Pool } from 'pg';
import config from './config';
import logger from './logger';

const REQUEUE_CHECK = 30000;

export const createAcker = () => {
  const pool = new Pool({ connectionString: config.databaseUrl });

  const timeout = setTimeout(async () => {
    logger.info(`Renotifying unacked jobs older than ${REQUEUE_CHECK}`);
    try {
      await pool.query(
        'call assemble_worker.renotify_unacked_jobs_queued_for_more_than_30_seconds()'
      );
    } catch (err) {
      logger.error('Could not renotify unacked jobs', err);
    }
  }, REQUEUE_CHECK);

  process.on('exit', async () => {
    clearTimeout(timeout);
    await pool.end();
  });

  return async (message: Notification) => {
    const messageStr = JSON.stringify(message);

    if (!message.payload) {
      logger.warn(`Encountered empty payload acking message: ${messageStr}`);
      return;
    }

    try {
      const splitByBar = message.payload.split('|');
      const stringContents = splitByBar.slice(1).join('|');

      const json = JSON.parse(stringContents);
      const job_id = json.job_id;

      logger.debug(`Acking job ${job_id}`);
      await pool.query(
        'update assemble_worker.jobs set last_acked_at = $1 where id = $2',
        [new Date(), job_id]
      );
    } catch (err) {
      logger.error(`Encountered error acking job: ${err.message}`, {
        messageStr,
      });
    }
  };
};
