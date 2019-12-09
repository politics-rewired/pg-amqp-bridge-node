import config from './config';
import { Pool, Notification } from 'pg';

const REQUEUE_CHECK = 30000;

export const createAcker = () => {
  const pool = new Pool({ connectionString: config.databaseUrl });

  setTimeout(async () => {
    console.log(`Renotifying unacked jobs older than ${REQUEUE_CHECK}`);
    try {
      await pool.query(
        'call assemble_worker.renotify_unacked_jobs_queued_for_more_than_30_seconds()'
      );
    } catch (ex) {
      console.error('Could not renotify unacked jobs', ex);
    }
  }, REQUEUE_CHECK);

  return async (message: Notification) => {
    try {
      const splitByBar = message.payload.split('|');
      const routingKey = splitByBar[0];
      const stringContents = splitByBar.slice(1).join('|');

      const json = JSON.parse(stringContents);
      const job_id = json.job_id;

      if (config.verbose) {
        console.log(`Acking job ${job_id}`);
        const result = await pool.query(
          'update assemble_worker.jobs set last_acked_at = $1 where id = $2',
          [new Date(), job_id]
        );
      }
    } catch (ex) {
      console.error('Could not ack job', ex);
    }
  };
};
