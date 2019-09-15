/**
 * task command
 * @param {*} taskID
 * @param {*} cache
 * @param {*} callback
 */
async function handle(taskID, cache, callback) {
  const config = await cache.fetchTaskConfig(taskID)
  console.dir(config)
  callback()
}

module.exports.handle = handle
