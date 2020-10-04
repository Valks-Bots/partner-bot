if (Number(process.version.slice(1).split('.')[0]) < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

const Discord = require('discord.js')
const client = new Discord.Client()

client.database = require('sqlite')
client.config = require('./config.js')
client.loader = require('./modules/Loader')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

require('dotenv').config()
require('./modules/functions.js')(client)

client.database.open('./database.sqlite') // Create database

// Cache
client.levelCache = {}
for (const permLevel of client.config.permLevels) {
  client.levelCache[permLevel.name] = permLevel.level
}

const init = async () => {
  console.clear()

  console.log('------------------------------------------------------------------------')
  console.log('You may use this bot in anyway you see fit, you may even change the owner name to be your own.')
  console.log('------------------------------------------------------------------------')

  const loader = await client.loader
  await loader.registerModules(client)
  await loader.registerCommands(client)
  await loader.registerEvents(client)
  await loader.checkDiscordStatus(client)
  await client.login(process.env.BOT_TOKEN)
}

init()
