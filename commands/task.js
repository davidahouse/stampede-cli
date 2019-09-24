const chalk = require('chalk')

/**
 * task command
 * @param {*} taskID
 * @param {*} cache
 * @param {*} callback
 */
async function handle(taskID, cache, callback) {
  const config = await cache.fetchTaskConfig(taskID)
  console.log(chalk.yellow('Task: ') + chalk.green(config.id) + ' ' +
    chalk.green(config.title))
  console.log(chalk.yellow('Config Parameters:'))
  for (let index = 0; index < config.config.length; index++) {
    console.log(chalk.green(config.config[index].key))
  }
  callback()
}

module.exports.handle = handle
