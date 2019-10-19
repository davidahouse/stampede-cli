const Queue = require('bull');
const chalk = require('chalk');

/**
 * queues command
 * @param {*} cache
 * @param {*} conf
 * @param {*} callback
 */
async function handle(cache, conf, callback) {
  const redisConfig = {
    redis: {
      port: conf.redisPort,
      host: conf.redisHost,
      password: conf.redisPassword
    }
  };

  const queueList = await cache.fetchSystemQueues();

  let maxQueueNameLength = 0;
  for (let index = 0; index < queueList.length; index++) {
    if (queueList[index].id.length > maxQueueNameLength) {
      maxQueueNameLength = queueList[index].id.length;
    }
  }

  console.log(
    chalk.yellow('|') +
      chalk.yellow('-'.padEnd(maxQueueNameLength, '-')) +
      chalk.yellow('|---|---|---|---|---|---|')
  );
  console.log(
    chalk.yellow('|') +
      chalk.yellow('Queue'.padEnd(maxQueueNameLength, ' ')) +
      chalk.yellow('| W | A | C | F | D | P |')
  );
  console.log(
    chalk.yellow('|') +
      chalk.yellow('-'.padEnd(maxQueueNameLength, '-')) +
      chalk.yellow('|---|---|---|---|---|---|')
  );

  for (let index = 0; index < queueList.length; index++) {
    const q = new Queue('stampede-' + queueList[index].id, redisConfig);
    const stats = await q.getJobCounts();
    console.log(
      chalk.yellow('|') +
        chalk.green(queueList[index].id.padEnd(maxQueueNameLength)) +
        chalk.yellow('|') +
        chalk.green(stats.waiting.toString().padStart(3)) +
        chalk.yellow('|') +
        chalk.green(stats.active.toString().padStart(3)) +
        chalk.yellow('|') +
        chalk.green(stats.completed.toString().padStart(3)) +
        chalk.yellow('|') +
        chalk.green(stats.failed.toString().padStart(3)) +
        chalk.yellow('|') +
        chalk.green(stats.delayed.toString().padStart(3)) +
        chalk.yellow('|') +
        chalk.green(stats.paused.toString().padStart(3)) +
        chalk.yellow('|')
    );
  }
  callback();
}

module.exports.handle = handle;
