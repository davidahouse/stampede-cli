const chalk = require('chalk');

/**
 * cancelBuild command
 * @param {*} build
 * @param {*} cache
 * @param {*} callback
 */
async function handle(build, cache, callback) {
  const builds = await cache.fetchActiveTasks(build);
  console.log(chalk.yellow('Cancelling tasks:'));
  for (let index = 0; index < builds.length; index++) {
    cache.removeTaskFromActiveList(build, builds[index]);
    console.log(chalk.green(builds[index]));
  }
  cache.removeBuildFromActiveList(build);
  console.log(chalk.yellow('Build cancelled'));
  callback();
}

module.exports.handle = handle;
