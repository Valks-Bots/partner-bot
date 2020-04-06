const chalk = require('chalk')
const moment = require('moment')

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

exports.error = (...args) => this.log(...args, 'error')

exports.warn = (...args) => this.log(...args, 'warn')

exports.cmd = (...args) => this.log(...args, 'cmd')

exports.ready = (...args) => this.log(...args, 'ready')
