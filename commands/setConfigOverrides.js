const fs = require('fs')
const chalk = require('chalk')
const yaml = require('js-yaml')

/**
 * setConfigOverrides command
 * @param {*} path
 * @param {*} cache
 * @param {*} callback
 */
async function handle(path, cache, callback) {
  if (fs.existsSync(path)) {
    const overrides = yaml.safeLoad(fs.readFileSync(path))
    cache.storeSystemOverrides(overrides)
    console.log(chalk.green('Set overrides from ' + path))
  } else {
    console.log(chalk.red('Unable to set overrides, file not found at ' + path))
  }
  callback()
}

module.exports.handle = handle
