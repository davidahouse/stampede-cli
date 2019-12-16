const fs = require('fs');
const chalk = require('chalk');

/**
 * setConfigDefault command
 * @param {*} name
 * @param {*} value
 * @param {*} cache
 * @param {*} callback
 */
async function handle(name, value, cache, callback) {
  cache.setSystemDefault(name, value);
  console.log(chalk.green('Default for ' + name + ' has been set to ' + value));
  callback();
}

module.exports.handle = handle;
