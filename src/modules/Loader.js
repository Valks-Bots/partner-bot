/**
 * Loading modules, commands, events as well as checking the current Discord status.
 * @module modules/Loader
 */

const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

/**
 * Register all the projects modules
 * @param {Discord.Client} client - The Discord client
 */
exports.registerModules = async (client) => {
  const moduleFiles = await readdir('./modules/')
  moduleFiles.forEach(file => {
    const moduleName = file.split('.')[0]
    if (moduleName[0] === moduleName[0].toLowerCase() || moduleName === 'Loader') { return }
    client[moduleName.toLowerCase()] = require('./' + moduleName)
  })
}

/**
 * Register all the projects commands
 * @param {Discord.Client} client - The Discord client
 */
exports.registerCommands = async (client) => {
  const cmdFolders = await readdir('./commands/')
  cmdFolders.forEach(async folder => {
    const cmdFiles = await readdir('./commands/' + folder + '/')
    if (cmdFiles.length > 0) client.logger.log(`Loading ${cmdFiles.length} commands from ${folder}`)
    const registeredCommands = []
    cmdFiles.forEach(file => {
      const commandName = file.split('.')[0]
      const props = require(`../commands/${folder}/${file}`)
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name)
      })
      registeredCommands.push(commandName)
    })
    client.logger.log(`Loaded: [${registeredCommands.join(' ')}]`)
  })
}

/**
 * Register all the projects events
 * @param {Discord.Client} client - The Discord client
 */
exports.registerEvents = async (client) => {
  const eventFiles = await readdir('./events/')
  client.logger.log(`Loading ${eventFiles.length} events`)

  const registeredEvents = []
  eventFiles.forEach(file => {
    const eventName = file.split('.')[0]
    const evt = require(`../events/${file}`)
    client.on(eventName, evt.bind(null, client))
    registeredEvents.push(eventName)
  })
  client.logger.log(`Loaded: [${registeredEvents.join(' ')}]`)
}

/**
 * Check the current Discord status
 * @param {Discord.Client} client - The Discord client
 */
exports.checkDiscordStatus = (client) => {
  require('axios').get(client.config.statusURL).then(({ data }) => client.logger.log(`Discord API Status: ${data.status.description}`))
}
