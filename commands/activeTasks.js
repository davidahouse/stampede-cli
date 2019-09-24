const chalk = require('chalk')

/**
 * activeTasks command
 * @param {*} build
 * @param {*} cache
 * @param {*} callback
 */
async function handle(build, cache, callback) {
  const builds = await cache.fetchActiveTasks(build)
  for (let index = 0; index < builds.length; index++) {
    console.log(chalk.green(builds[index]))
  }
  callback()
}

module.exports.handle = handle
