const Queue = require('bull');

/**
 * process command
 * @param {*} taskID
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(taskID, redisConfig, callback) {
  const q = new Queue('stampede-' + taskID, redisConfig);
  q.process(function(job) {
    console.log(JSON.stringify(job, null, 4));
  });
}

module.exports.handle = handle;
