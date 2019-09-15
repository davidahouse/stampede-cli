#!/usr/bin/env node
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const vorpal = require('vorpal')()
const cache = require('stampede-cache')

// commands
const tasks = require('../commands/tasks')
const task = require('../commands/task')
const repoConfig = require('../commands/repoConfig')
const setRepoConfig = require('../commands/setRepoConfig')
const ghEvent = require('../commands/ghEvent')
const queues = require('../commands/queues')
const process = require('../commands/process')

require('pkginfo')(module)
const conf = require('rc')('stampede', {
  // defaults
  redisHost: 'cache',
  redisPort: 6379,
  redisPassword: null,
})

cache.startCache(conf)

clear()
console.log(chalk.yellow(figlet.textSync('stampede', {horizontalLayout: 'full'})))
console.log(chalk.yellow(module.exports.version))

// Tasks

vorpal
    .command('tasks', 'List the configured tasks in this stampede system')
    .action(function(args, callback) {
      tasks.handle(cache, callback)
    })
vorpal
    .command('task [id]', 'Get the configuration for a single task')
    .action(function(args, callback) {
      task.handle(args.id, cache, callback)
    })

// Repo Config

vorpal
    .command('repoConfig [owner] [repo]', 'Get the configuration in the cache for the repository')
    .action(function(args, callback) {
      repoConfig.handle(args.owner, args.repo, cache, callback)
    })
vorpal
    .command('setRepoConfig [owner] [repo] [file]', 'Set the configuration in the cache for the repository')
    .action(function(args, callback) {
      setRepoConfig.handle(args.owner, args.repo, args.file, cache, callback)
    })

// Server interactions

vorpal
    .command('ghEvent [host] [port] [event] [eventfile]', 'Sends an event payload to the stampede server')
    .action(function(args, callback) {
      ghEvent.handle(args.host, args.port, args.event, args.eventfile, callback)
    })

// Queues

vorpal
    .command('queues', 'Get stats on all the queues in the stampede system')
    .action(function(args, callback) {
      queues.handle(cache, conf, callback)
    })

vorpal
    .command('process [task]', 'Process items from a task queue')
    .action(function(args, callback) {
      process.handle(args.task, conf, callback)
    })

vorpal.delimiter('stampede>').show()
