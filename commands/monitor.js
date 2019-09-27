const Queue = require('bull')
const chalk = require('chalk')
const fs = require('fs')

let count = 0

/**
 * monitor command
 * @param {*} queue
 * @param {*} path
 * @param {*} conf
 * @param {*} callback
 */
async function handle(queue, path, conf, callback) {
  const redisConfig = {
    redis: {
      port: conf.redisPort,
      host: conf.redisHost,
      password: conf.redisPassword,
    },
  }
  const q = new Queue(queue, redisConfig)
  q.process(function(job) {
    console.log(chalk.green(job.data.notification) + ' [' + chalk.yellow(job.data.id) + ']')
    if (path != null) {
      count += 1
      fs.writeFileSync(path + '/' + count.toString() + '-' + job.data.notification + '-' + job.data.id + '.log',
          JSON.stringify(job.data, null, 2))
    }
  })
}

module.exports.handle = handle
