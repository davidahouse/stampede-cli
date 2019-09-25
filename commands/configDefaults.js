const chalk = require('chalk')

/**
 * configDefaults command
 * @param {*} cache
 * @param {*} callback
 */
async function handle(cache, callback) {
  const defaults = await cache.fetchSystemDefaults()
  const keys = Object.keys(defaults.defaults)
  for (let index = 0; index < keys.length; index++) {
    console.log(chalk.yellow(keys[index]) + ': ' +
    chalk.green(defaults.defaults[keys[index]]))
  }
  callback()
}

module.exports.handle = handle
