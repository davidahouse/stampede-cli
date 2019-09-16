const Queue = require('bull')

/**
 * monitor command
 * @param {*} queue
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(queue, redisConfig, callback) {
  const q = new Queue(queue, redisConfig)
  q.process(function(job) {
    console.log(job.notification)
  })
}

module.exports.handle = handle
