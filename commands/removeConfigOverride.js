const fs = require('fs');
const chalk = require('chalk');

/**
 * removeConfigOverride command
 * @param {*} name
 * @param {*} cache
 * @param {*} callback
 */
async function handle(name, cache, callback) {
  cache.removeSystemOverride(name);
  console.log(chalk.green('Override for ' + name + ' has been removed'));
  callback();
}

module.exports.handle = handle;
