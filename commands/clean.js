const Queue = require("bull");

/**
 * process command
 * @param {*} taskID
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(taskID, conf, callback) {
  const redisConfig = {
    redis: {
      port: conf.redisPort,
      host: conf.redisHost,
      password: conf.redisPassword
    }
  };

  const q = new Queue("stampede-" + taskID, redisConfig);
  q.clean(5000);
  q.clean(5000, "failed");
  console.log("Queue cleaned");
  callback();
}

module.exports.handle = handle;
