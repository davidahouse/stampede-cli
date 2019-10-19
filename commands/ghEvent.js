const fs = require('fs');
const LynnRequest = require('lynn-request');

/**
 * ghEvent command
 * @param {*} host
 * @param {*} port
 * @param {*} event
 * @param {*} eventFile
 * @param {*} callback
 */
async function handle(host, port, event, eventFile, callback) {
  const eventContents = fs.readFileSync(eventFile);
  const eventBody = JSON.parse(eventContents);
  const request = {
    title: 'ghEvent',
    options: {
      protocol: 'http:',
      port: port,
      method: 'POST',
      host: host,
      path: '/github',
      body: eventBody,
      headers: {
        'Content-Type': 'application/json',
        'x-github-event': event
      }
    }
  };
  const runner = new LynnRequest(request);
  runner.execute(function(result) {
    console.dir(result);
    callback();
  });
}

module.exports.handle = handle;
