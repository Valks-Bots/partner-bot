/**
 * Beautiful console logger with color and timestamps.
 * @module modules/Logger
 */

const chalk = require('chalk')
const moment = require('moment')

/**
 * Log a message to console
 * @param {string} content - The content of the message you want to log to the console
 * @param {string} type - The type of logging ['log', 'warn', 'error', 'cmd', 'ready']
 */
exports.log = (content, type = 'log') => {
  const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`
  const format = `${timestamp} [${type.toUpperCase()}]: ${content}`
  switch (type) {
    case 'log': {
      return console.log(chalk.white(format))
    }
    case 'warn': {
      return console.log(chalk.red(format))
    }
    case 'error': {
      return console.log(chalk.redBright(format))
    }
    case 'cmd': {
      return console.log(chalk.white(format))
    }
    case 'ready': {
      return console.log(chalk.rgb(150, 255, 150)(format))
    }
  }
}

/**
 * Log a error to the console
 * @param {string} args - The message of the error
 */
exports.error = (...args) => this.log(...args, 'error')

/**
 * Log a warning to the console
 * @param {string} args - The message of the warning
 */
exports.warn = (...args) => this.log(...args, 'warn')

/**
 * Log a command to the console
 * @param {string} args - The message of the command
 */
exports.cmd = (...args) => this.log(...args, 'cmd')

/**
 * Log that the bot is ready to console
 * @param {string} args - The message of the status
 */
exports.ready = (...args) => this.log(...args, 'ready')
