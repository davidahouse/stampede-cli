const chalk = require('chalk');

/**
 * task command
 * @param {*} taskID
 * @param {*} cache
 * @param {*} callback
 */
async function handle(taskID, cache, callback) {
  await cache.removeTaskConfig(taskID)
  console.log('Task ' + taskID + ' removed')
  callback();
}

module.exports.handle = handle;
