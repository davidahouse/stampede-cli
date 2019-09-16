/**
 * builds command
 * @param {*} cache
 * @param {*} callback
 */
async function handle(cache, callback) {
  const builds = await cache.fetchActiveBuilds()
  console.dir(builds)
  callback()
}

module.exports.handle = handle
