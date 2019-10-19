/**
 * clearRepoConfig command
 * @param {*} owner
 * @param {*} repo
 * @param {*} file
 * @param {*} cache
 * @param {*} callback
 */
async function handle(owner, repo, file, cache, callback) {
  cache.removeRepoConfig(owner, repo);
  callback();
}

module.exports.handle = handle;
