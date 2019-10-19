const fs = require('fs');
const yaml = require('js-yaml');

/**
 * setRepoConfig command
 * @param {*} owner
 * @param {*} repo
 * @param {*} file
 * @param {*} cache
 * @param {*} callback
 */
async function handle(owner, repo, file, cache, callback) {
  const configFile = fs.readFileSync(file);
  if (configFile != null) {
    const config = yaml.safeLoad(configFile);
    cache.storeRepoConfig(owner, repo, config);
    console.log('Repository configuration stored in the cache');
  } else {
    console.log('Unable to load config file');
  }
  callback();
}

module.exports.handle = handle;
