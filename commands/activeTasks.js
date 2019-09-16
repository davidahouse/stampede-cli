/**
 * builds command
 * @param {*} build
 * @param {*} cache
 * @param {*} callback
 */
async function handle(build, cache, callback) {
  const builds = await cache.fetchActiveTasks(build)
  console.dir(builds)
  callback()
}

module.exports.handle = handle
