const chalk = require('chalk');

/**
 * tasks command
 * @param {*} cache
 * @param {*} callback
 */
async function handle(cache, callback) {
  const tasks = await cache.fetchTasks();
  for (let index = 0; index < tasks.length; index++) {
    console.log(chalk.green(tasks[index]));
  }
  callback();
}

module.exports.handle = handle;
