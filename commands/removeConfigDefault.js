const fs = require('fs');
const chalk = require('chalk');

/**
 * removeConfigDefault command
 * @param {*} name
 * @param {*} cache
 * @param {*} callback
 */
async function handle(name, cache, callback) {
  cache.removeSystemDefault(name);
  console.log(chalk.green('Default for ' + name + ' has been removed'));
  callback();
}

module.exports.handle = handle;
