const fs = require('fs');
const chalk = require('chalk');
const yaml = require('js-yaml');

/**
 * setTask command
 * @param {*} path
 * @param {*} cache
 * @param {*} callback
 */
async function handle(path, cache, callback) {
  if (fs.existsSync(path)) {
    const taskDetails = yaml.safeLoad(
      fs.readFileSync(path)
    );
    if (taskDetails.id != null) {
      await cache.storeTask(taskDetails.id);
      await cache.storeTaskConfig(taskDetails.id, taskDetails);
    } else {
      console.log(
        chalk.red('Skipping ' + path + ' as no task id found')
      );
    }
  } else {
    console.log(chalk.red('Unable to set task, file not found at ' + path));
  }
  callback();
}

module.exports.handle = handle;
