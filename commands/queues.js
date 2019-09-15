const Queue = require('bull')

/**
 * queues command
 * @param {*} cache
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(cache, redisConfig, callback) {
  const tasks = await cache.fetchTasks()
  for (let index = 0; index < tasks.length; index++) {
    const q = new Queue('stampede-' + tasks[index], redisConfig)
    const stats = await q.getJobCounts()
    console.log(tasks[index])
    console.dir(stats)
  }
  callback()
}

module.exports.handle = handle
