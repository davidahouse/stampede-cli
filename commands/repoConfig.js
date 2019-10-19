/**
 * repoConfig command
 * @param {*} owner
 * @param {*} repo
 * @param {*} cache
 * @param {*} callback
 */
async function handle(owner, repo, cache, callback) {
  const config = await cache.fetchRepoConfig(owner, repo);
  console.log(JSON.stringify(config, null, 4));
  callback();
}

module.exports.handle = handle;
