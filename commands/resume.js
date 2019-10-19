const Queue = require('bull');
const chalk = require('chalk');

/**
 * resume command
 * @param {*} name
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(name, redisConfig, callback) {
  const q = new Queue('stampede-' + name, redisConfig);
  q.resume();
  console.log(chalk.green(name + ' resumed'));
  callback();
}

module.exports.handle = handle;
