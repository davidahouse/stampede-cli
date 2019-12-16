const fs = require('fs');
const chalk = require('chalk');

/**
 * setConfigOverride command
 * @param {*} name
 * @param {*} value
 * @param {*} cache
 * @param {*} callback
 */
async function handle(name, value, cache, callback) {
  cache.setSystemOverride(name, value);
  console.log(chalk.green('Override for ' + name + ' has been set to ' + value));
  callback();
}

module.exports.handle = handle;
