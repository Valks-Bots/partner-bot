/*
 * Copyright © 2019 valkyrienyanko All rights reserved.
 *
 * You may not, unless given explicit permission from myself, make a profit off the following source or modify or remove the author name.
 */
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

  // Copyright Notice - Do not Remove
  console.log('------------------------------------------------------------------------')
  console.log('Copyright © 2019 valkyrienyanko All rights reserved.\n')
  console.log('You may not, unless given explicit permission from myself, make a profit')
  console.log('off the following source or modify or remove the author name.')
  console.log('------------------------------------------------------------------------')

  const loader = await client.loader
  await loader.registerModules(client)
  await loader.registerCommands(client)
  await loader.registerEvents(client)
  await loader.checkDiscordStatus(client)
  await client.login(process.env.BOT_TOKEN)
}

init()
