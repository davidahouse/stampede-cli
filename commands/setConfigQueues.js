const fs = require('fs');
const chalk = require('chalk');
const yaml = require('js-yaml');

/**
 * setConfigQueues command
 * @param {*} path
 * @param {*} cache
 * @param {*} callback
 */
async function handle(path, cache, callback) {
  if (fs.existsSync(path)) {
    const queues = yaml.safeLoad(fs.readFileSync(path));
    cache.storeSystemQueues(queues);
    console.log(chalk.green('Set queues from ' + path));
  } else {
    console.log(chalk.red('Unable to set queues, file not found at ' + path));
  }
  callback();
}

module.exports.handle = handle;
