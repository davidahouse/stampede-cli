const chalk = require('chalk');

/**
 * task command
 * @param {*} taskID
 * @param {*} cache
 * @param {*} callback
 */
async function handle(taskID, cache, callback) {
  const config = await cache.fetchTaskConfig(taskID);
  console.log(
    chalk.yellow('Task: ') +
      chalk.green(config.id) +
      ' ' +
      chalk.green(config.title)
  );
  console.log(chalk.yellow('Config Parameters:'));
  for (let index = 0; index < config.config.length; index++) {
    console.log(chalk.green(config.config[index].key));
  }
  if (config.taskQueue != null) {
    console.log(chalk.yellow('Task Queue: ') + chalk.green(config.taskQueue));
  }
  if (config.worker != null) {
    console.log(chalk.yellow('Worker:'));
    Object.keys(config.worker).forEach(function(key) {
      console.log(chalk.green(key) + ' ' + chalk.green(config.worker[key]));
    });
  }
  callback();
}

module.exports.handle = handle;
