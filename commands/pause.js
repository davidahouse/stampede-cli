const Queue = require('bull');
const chalk = require('chalk');

/**
 * pause command
 * @param {*} name
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(name, redisConfig, callback) {
  const q = new Queue('stampede-' + name, redisConfig);
  q.pause();
  console.log(chalk.green(name + ' paused'));
  callback();
}

module.exports.handle = handle;
