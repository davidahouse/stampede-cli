const chalk = require('chalk');

/**
 * builds command
 * @param {*} cache
 * @param {*} callback
 */
async function handle(cache, callback) {
  const builds = await cache.fetchActiveBuilds();
  for (let index = 0; index < builds.length; index++) {
    console.log(chalk.green(builds[index]));
  }
  callback();
}

module.exports.handle = handle;
