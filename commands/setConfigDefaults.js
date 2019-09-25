const fs = require('fs')
const chalk = require('chalk')
const yaml = require('js-yaml')

/**
 * setConfigDefaults command
 * @param {*} path
 * @param {*} cache
 * @param {*} callback
 */
async function handle(path, cache, callback) {
  if (fs.existsSync(path)) {
    const defaults = yaml.safeLoad(fs.readFileSync(path))
    cache.storeSystemDefaults(defaults)
    console.log(chalk.green('Set defaults from ' + path))
  } else {
    console.log(chalk.red('Unable to set defaults, file not found at ' + path))
  }
  callback()
}

module.exports.handle = handle
