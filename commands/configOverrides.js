const chalk = require('chalk');

/**
 * configOverrides command
 * @param {*} cache
 * @param {*} callback
 */
async function handle(cache, callback) {
  const defaults = await cache.fetchSystemOverrides();
  const keys = Object.keys(defaults.overrides);
  for (let index = 0; index < keys.length; index++) {
    console.log(
      chalk.yellow(keys[index]) +
        ': ' +
        chalk.green(defaults.overrides[keys[index]])
    );
  }
  callback();
}

module.exports.handle = handle;
