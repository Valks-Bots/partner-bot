/**
 * Fires when the bot receives a message
 * @module events/message
 * @param {Discord.Client} client - The Discord client
 * @param {Discord.Message} message - The message that was received
 */

module.exports = async (client, message) => {
  if (message.author.bot) return // We don't want the bot reacting to itself..

  if (!message.content.startsWith(client.config.prefix)) return

  const command = message.content.split(' ')[0].slice(client.config.prefix.length)
  const args = message.content.split(' ').slice(1)
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  // Is this a valid command?
  if (!cmd || command === '') return

  // Delete the executors message.
  if (client.config.deleteCommands && !message.deleted) {
    if (message.deletable) {
      message.delete().catch(console.error)
    }
  }

  // Is the command only available in guilds?
  if (!message.guild && cmd.conf.guildOnly) return client.embed.send(message, { desc: 'This command is unavailable via private messages. Please run this command in a guild.' })

  // Is the bot currently under going maintenence?
  if (client.config.botMaintenance && message.author.id !== client.config.ownerID) return client.embed.send(message, { desc: 'The bot can currently only be run by the bot owner. Sorry for the inconvience.' })

  // Check command cooldown
  // client.cooldowns[message.author.id] = ...

  client.permLevel(client, message).then(permLevel => {
    if (permLevel >= client.levelCache[cmd.conf.permLevel]) {
      const guildName = message.guild.name.replace(/[^1-90a-zA-Z ]/g, '').trim()
      client.logger.cmd(`${guildName}: ${message.author.tag}: '${message.content}'`)
      cmd.run(client, message, args)
    } else {
      client.embed.send(message, {
        code: true,
        desc: 'You do not have permission to run this command.',
        fields: [
          {
            name: 'Have',
            value: client.config.permLevels.find(l => l.level === permLevel).name
          },
          {
            name: 'Required',
            value: cmd.conf.permLevel
          }
        ]
      })
    }
  }).catch((e) => {
    if (message.guild) {
      client.embed.debug(message, `Tell ${message.guild.owner.tag} to assign a role for ${client.config.permLevels.find(l => l.level === e).name} in the settings.`)
    }
  })
}
