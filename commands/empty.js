const Queue = require("bull");

/**
 * process command
 * @param {*} queue
 * @param {*} redisConfig
 * @param {*} callback
 */
async function handle(queue, conf, callback) {
  const redisConfig = {
    redis: {
      port: conf.redisPort,
      host: conf.redisHost,
      password: conf.redisPassword
    }
  };

  const q = new Queue(queue, redisConfig);
  q.empty();
  console.log("Queue emptied...");
  callback();
}

module.exports.handle = handle;
