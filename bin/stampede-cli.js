#!/usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const vorpal = require('vorpal')()
const Ora = require('ora')
const cache = require('stampede-cache')

// commands
const tasks = require('../commands/tasks')

var pkginfo = require('pkginfo')(module)
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

vorpal
  .command('tasks', 'List the configured tasks in this stampede system')
  .action(function(args, callback) {
    tasks.handle(cache, callback)
  })

vorpal.delimiter('stampede>').show()
