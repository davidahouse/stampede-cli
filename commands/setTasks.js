const fs = require('fs')
const chalk = require('chalk')
const yaml = require('js-yaml')

/**
 * tasks command
 * @param {*} path
 * @param {*} cache
 * @param {*} callback
 */
async function handle(path, cache, callback) {
  if (fs.existsSync(path)) {
    const tasks = yaml.safeLoad(fs.readFileSync(path))
    cache.storeTaskConfig(tasks)
    console.log(chalk.green('Set tasks list from ' + path))
  } else {
    console.log(chalk.red('Unable to set tasks, file not found at ' + path))
  }
  callback()
}

module.exports.handle = handle
