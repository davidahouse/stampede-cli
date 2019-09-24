const Queue = require('bull')
const chalk = require('chalk')

/**
 * queues command
 * @param {*} cache
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(cache, redisConfig, callback) {
  const tasks = await cache.fetchTasks()

  let maxQueueNameLength = 0
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index].length > maxQueueNameLength) {
      maxQueueNameLength = tasks[index].length
    }
  }

  console.log(chalk.yellow('|') +
    chalk.yellow('-'.padEnd(maxQueueNameLength, '-')) +
    chalk.yellow('|---|---|---|---|---|---|'))
  console.log(chalk.yellow('|') +
    chalk.yellow('Queue'.padEnd(maxQueueNameLength, ' ')) +
    chalk.yellow('| W | A | C | F | D | P |'))
  console.log(chalk.yellow('|') +
    chalk.yellow('-'.padEnd(maxQueueNameLength, '-')) +
    chalk.yellow('|---|---|---|---|---|---|'))

  for (let index = 0; index < tasks.length; index++) {
    const q = new Queue('stampede-' + tasks[index], redisConfig)
    const stats = await q.getJobCounts()
    console.log(chalk.yellow('|') + 
      chalk.green(tasks[index].padEnd(maxQueueNameLength)) + 
      chalk.yellow('|') +
      chalk.green(stats.waiting.toString().padStart(3)) + 
      chalk.yellow('|') +
      chalk.green(stats.active.toString().padStart(3)) + 
      chalk.yellow('|') +
      chalk.green(stats.completed.toString().padStart(3)) + 
      chalk.yellow('|') +
      chalk.green(stats.failed.toString().padStart(3)) + 
      chalk.yellow('|') +
      chalk.green(stats.delayed.toString().padStart(3)) + 
      chalk.yellow('|') +
      chalk.green(stats.paused.toString().padStart(3)) + 
      chalk.yellow('|'))
  }
  callback()
}

module.exports.handle = handle
