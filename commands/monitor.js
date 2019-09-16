const Queue = require('bull')
const chalk = require('chalk')

/**
 * monitor command
 * @param {*} queue
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(queue, redisConfig, callback) {
  const q = new Queue(queue, redisConfig)
  q.process(function(job) {
    console.log(chalk.green(job.data.notification) + ' [' + chalk.yellow(job.data.id) + ']')
  })
}

module.exports.handle = handle
