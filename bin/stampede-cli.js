#!/usr/bin/env node
const chalk = require('chalk');
const figlet = require('figlet');
const vorpal = require('vorpal')();
const cache = require('stampede-cache');

// tasks
const tasks = require('../commands/tasks');
const setTasks = require('../commands/setTasks');
const task = require('../commands/task');

// config
const repoConfig = require('../commands/repoConfig');
const setRepoConfig = require('../commands/setRepoConfig');
const clearRepoConfig = require('../commands/clearRepoConfig');
const configDefaults = require('../commands/configDefaults');
const setConfigDefaults = require('../commands/setConfigDefaults');
const configOverrides = require('../commands/configOverrides');
const setConfigOverrides = require('../commands/setConfigOverrides');

// server interactions
const ghEvent = require('../commands/ghEvent');

// queues
const queues = require('../commands/queues');
const flush = require('../commands/flush');
const monitor = require('../commands/monitor');
const pause = require('../commands/pause');
const resume = require('../commands/resume');

// builds
const builds = require('../commands/builds');
const activeTasks = require('../commands/activeTasks');
const cancelBuild = require('../commands/cancelBuild');

require('pkginfo')(module);
const conf = require('rc')('stampede', {
  // defaults
  redisHost: 'cache',
  redisPort: 6379,
  redisPassword: null
});

cache.startCache(conf);

console.log(
  chalk.yellow(figlet.textSync('stampede', { horizontalLayout: 'full' }))
);
console.log(chalk.yellow(module.exports.version));

// Tasks

vorpal
  .command('tasks', 'List the configured tasks in this stampede system')
  .action(function(args, callback) {
    tasks.handle(cache, callback);
  });
vorpal
  .command('setTasks [path]', 'Set the tasks list for the system')
  .action(function(args, callback) {
    setTasks.handle(args.path, cache, callback);
  });
vorpal
  .command('task [id]', 'Get the configuration for a single task')
  .action(function(args, callback) {
    task.handle(args.id, cache, callback);
  });

// Config

vorpal
  .command(
    'repoConfig [owner] [repo]',
    'Get the configuration in the cache for the repository'
  )
  .action(function(args, callback) {
    repoConfig.handle(args.owner, args.repo, cache, callback);
  });
vorpal
  .command(
    'setRepoConfig [owner] [repo] [file]',
    'Set the configuration in the cache for the repository'
  )
  .action(function(args, callback) {
    setRepoConfig.handle(args.owner, args.repo, args.file, cache, callback);
  });
vorpal
  .command(
    'clearRepoConfig [owner] [repo]',
    'Clears the configuration in the cache for the repository'
  )
  .action(function(args, callback) {
    clearRepoConfig.handle(args.owner, args.repo, args.file, cache, callback);
  });

vorpal
  .command('configDefaults', 'Get the config defaults set in the server')
  .action(function(args, callback) {
    configDefaults.handle(cache, callback);
  });
vorpal
  .command('setConfigDefaults [file]', 'Set the config defaults')
  .action(function(args, callback) {
    setConfigDefaults.handle(args.file, cache, callback);
  });

vorpal
  .command('configOverrides', 'Get the config overrides set in the server')
  .action(function(args, callback) {
    configOverrides.handle(cache, callback);
  });
vorpal
  .command('setConfigOverrides [file]', 'Set the config overrides')
  .action(function(args, callback) {
    setConfigOverrides.handle(args.file, cache, callback);
  });

// Server interactions

vorpal
  .command(
    'ghEvent [host] [port] [event] [eventfile]',
    'Sends an event payload to the stampede server'
  )
  .action(function(args, callback) {
    ghEvent.handle(args.host, args.port, args.event, args.eventfile, callback);
  });

// Queues

vorpal
  .command('queues', 'Get stats on all the queues in the stampede system')
  .action(function(args, callback) {
    queues.handle(cache, conf, callback);
  });

vorpal
  .command('flush [task]', 'Flush items from a task queue')
  .action(function(args, callback) {
    flush.handle(args.task, conf, callback);
  });

vorpal
  .command('monitor [queue] [path]', 'Monitor a notifications queue')
  .action(function(args, callback) {
    monitor.handle(
      args.queue != null ? args.queue : 'stampede-cli',
      args.path,
      conf,
      callback
    );
  });

vorpal
  .command('pause [queue]', 'Pause a queue')
  .action(function(args, callback) {
    pause.handle(args.queue, conf, callback);
  });

vorpal
  .command('resume [queue]', 'Resume a queue')
  .action(function(args, callback) {
    resume.handle(args.queue, conf, callback);
  });

// Active builds and tasks

vorpal
  .command('builds', 'Get list of active builds')
  .action(function(args, callback) {
    builds.handle(cache, callback);
  });
vorpal
  .command('cancelBuild [build]', 'Cancel a build and all its tasks')
  .action(function(args, callback) {
    cancelBuild.handle(args.build, cache, callback);
  });

vorpal
  .command('activeTasks [build]', 'Get list of active tasks for a build')
  .action(function(args, callback) {
    activeTasks.handle(args.build, cache, callback);
  });

vorpal.history('stampede-cli');
vorpal.delimiter('stampede>').show();
