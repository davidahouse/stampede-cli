const fs = require('fs');
const chalk = require('chalk');
const yaml = require('js-yaml');

/**
 * tasks command
 * @param {*} path
 * @param {*} cache
 * @param {*} callback
 */
async function handle(path, cache, callback) {
  if (fs.existsSync(path)) {
    await cache.removeTaskConfig();
    const files = fs.readdirSync(path).filter(function(file) {
      return file.endsWith('.yaml');
    });
    for (let index = 0; index < files.length; index++) {
      const taskDetails = yaml.safeLoad(
        fs.readFileSync(path + '/' + files[index])
      );
      if (taskDetails.id != null) {
        await cache.storeTask(taskDetails.id);
        await cache.storeTaskConfig(taskDetails.id, taskDetails);
      } else {
        console.log(
          chalk.red('Skipping ' + files[index] + ' as no task id found')
        );
      }
    }
    console.log(chalk.green('Set tasks list from ' + path));
  } else {
    console.log(chalk.red('Unable to set tasks, file not found at ' + path));
  }
  callback();
}

module.exports.handle = handle;
