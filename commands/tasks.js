
async function handle(cache, callback) {
  const tasks = await cache.fetchTasks()
  console.dir(tasks)
  callback()
}

module.exports.handle = handle