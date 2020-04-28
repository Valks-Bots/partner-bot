const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

exports.registerModules = async (client) => {
  const moduleFiles = await readdir('./modules/')
  moduleFiles.forEach(file => {
    const moduleName = file.split('.')[0]
    if (moduleName[0] === moduleName[0].toLowerCase() || moduleName === 'Loader') { return }
    client[moduleName.toLowerCase()] = require('./' + moduleName)
  })
}

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

exports.checkDiscordStatus = (client) => {
  require('axios').get(client.config.statusURL).then(({ data }) => client.logger.log(`Discord API Status: ${data.status.description}`))
}
