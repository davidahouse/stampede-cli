#!/usr/bin/env node
const chalk = require("chalk");
const figlet = require("figlet");
const vorpal = require("vorpal")();
const cache = require("stampede-cache");

// tasks
const tasks = require("../commands/tasks");
const setTask = require("../commands/setTask");
const removeTask = require("../commands/removeTask");
const task = require("../commands/task");

// config
const repoConfig = require("../commands/repoConfig");
const setRepoConfig = require("../commands/setRepoConfig");
const clearRepoConfig = require("../commands/clearRepoConfig");
const configDefaults = require("../commands/configDefaults");
const setConfigDefaults = require("../commands/setConfigDefaults");
const setConfigDefault = require("../commands/setConfigDefault");
const removeConfigDefault = require("../commands/removeConfigDefault");
const configOverrides = require("../commands/configOverrides");
const setConfigOverrides = require("../commands/setConfigOverrides");
const setConfigQueues = require("../commands/setConfigQueues");
const setConfigOverride = require("../commands/setConfigOverride");
const removeConfigOverride = require("../commands/removeConfigOverride");

// server interactions
const ghEvent = require("../commands/ghEvent");

// queues
const queues = require("../commands/queues");
const flush = require("../commands/flush");
const monitor = require("../commands/monitor");
const pause = require("../commands/pause");
const resume = require("../commands/resume");
const clean = require("../commands/clean");
const empty = require("../commands/empty");

// builds
const builds = require("../commands/builds");
const activeTasks = require("../commands/activeTasks");
const cancelBuild = require("../commands/cancelBuild");

require("pkginfo")(module);
const conf = require("rc")("stampede", {
  // defaults
  redisHost: "cache",
  redisPort: 6379,
  redisPassword: null
});

cache.startCache(conf);

console.log(
  chalk.yellow(figlet.textSync("stampede", { horizontalLayout: "full" }))
);
console.log(chalk.yellow(module.exports.version));

// Tasks

vorpal
  .command("tasks", "List the configured tasks in this stampede system")
  .action(function(args, callback) {
    tasks.handle(cache, callback);
  });
vorpal
  .command("task [id]", "Get the configuration for a single task")
  .action(function(args, callback) {
    task.handle(args.id, cache, callback);
  });
vorpal
  .command("removeTask [id]", "Remove a task config from the system")
  .action(function(args, callback) {
    removeTask.handle(args.id, cache, callback);
  });
vorpal
  .command("setTask [path]", "Set the task config for a single task")
  .action(function(args, callback) {
    setTask.handle(args.path, cache, callback);
  });

// Config

vorpal
  .command(
    "repoConfig [owner] [repo]",
    "Get the configuration in the cache for the repository"
  )
  .action(function(args, callback) {
    repoConfig.handle(args.owner, args.repo, cache, callback);
  });
vorpal
  .command(
    "setRepoConfig [owner] [repo] [file]",
    "Set the configuration in the cache for the repository"
  )
  .action(function(args, callback) {
    setRepoConfig.handle(args.owner, args.repo, args.file, cache, callback);
  });
vorpal
  .command(
    "clearRepoConfig [owner] [repo]",
    "Clears the configuration in the cache for the repository"
  )
  .action(function(args, callback) {
    clearRepoConfig.handle(args.owner, args.repo, args.file, cache, callback);
  });

vorpal
  .command("configDefaults", "Get the config defaults set in the server")
  .action(function(args, callback) {
    configDefaults.handle(cache, callback);
  });
vorpal
  .command("setConfigDefaults [file]", "Set the config defaults")
  .action(function(args, callback) {
    setConfigDefaults.handle(args.file, cache, callback);
  });
vorpal
  .command("setConfigDefault [default] [value]", "Set a config default")
  .action(function(args, callback) {
    setConfigDefault.handle(args.default, args.value, cache, callback);
  });
vorpal
  .command("removeConfigDefault [default]", "Remove a config default")
  .action(function(args, callback) {
    removeConfigDefault.handle(args.default, cache, callback);
  });

vorpal
  .command("configOverrides", "Get the config overrides set in the server")
  .action(function(args, callback) {
    configOverrides.handle(cache, callback);
  });
vorpal
  .command("setConfigOverrides [file]", "Set the config overrides")
  .action(function(args, callback) {
    setConfigOverrides.handle(args.file, cache, callback);
  });
vorpal
  .command("setConfigOverride [override] [value]", "Set a config override")
  .action(function(args, callback) {
    setConfigOverride.handle(args.override, args.value, cache, callback);
  });
vorpal
  .command("removeConfigOverride [override]", "Remove a config override")
  .action(function(args, callback) {
    removeConfigOverride.handle(args.override, cache, callback);
  });

vorpal
  .command("setConfigQueues [file]", "Set the list of queues in the config")
  .action(function(args, callback) {
    setConfigQueues.handle(args.file, cache, callback);
  });

// Server interactions

vorpal
  .command(
    "ghEvent [host] [port] [event] [eventfile]",
    "Sends an event payload to the stampede server"
  )
  .action(function(args, callback) {
    ghEvent.handle(args.host, args.port, args.event, args.eventfile, callback);
  });

// Queues

vorpal
  .command("queues", "Get stats on all the queues in the stampede system")
  .action(function(args, callback) {
    queues.handle(cache, conf, callback);
  });

vorpal
  .command("flush [task]", "Flush items from a task queue")
  .action(function(args, callback) {
    flush.handle(args.task, conf, callback);
  });

vorpal
  .command("clean [task]", "Clean items from a task queue")
  .action(function(args, callback) {
    clean.handle(args.task, conf, callback);
  });

vorpal
  .command("empty [queue]", "Empty all items from a queue")
  .action(function(args, callback) {
    empty.handle(args.queue, conf, callback);
  });

vorpal
  .command("monitor [queue] [path]", "Monitor a notifications queue")
  .action(function(args, callback) {
    monitor.handle(
      args.queue != null ? args.queue : "stampede-cli",
      args.path,
      conf,
      callback
    );
  });

vorpal
  .command("pause [queue]", "Pause a queue")
  .action(function(args, callback) {
    pause.handle(args.queue, conf, callback);
  });

vorpal
  .command("resume [queue]", "Resume a queue")
  .action(function(args, callback) {
    resume.handle(args.queue, conf, callback);
  });

// Active builds and tasks

vorpal
  .command("builds", "Get list of active builds")
  .action(function(args, callback) {
    builds.handle(cache, callback);
  });
vorpal
  .command("cancelBuild [build]", "Cancel a build and all its tasks")
  .action(function(args, callback) {
    cancelBuild.handle(args.build, cache, callback);
  });

vorpal
  .command("activeTasks [build]", "Get list of active tasks for a build")
  .action(function(args, callback) {
    activeTasks.handle(args.build, cache, callback);
  });

vorpal.history("stampede-cli");
vorpal.delimiter("stampede>").show();
