/**
 * Initialize the bot in the guild the command was executed in.
 * @module commands/init
 */

/**
 * Execute command
 * @param {Discord.Client} client - The Discord client
 * @param {Discord.Message} message - The message of the command
 * @param {string} args - The arguments of the command
 */
exports.run = async (client, message, args) => {
  if (args[0] === undefined) {
    return client.embed.send(message, { desc: 'Please specify a channel.' })
  }
  const channel = client.guilds.cache.get(message.guild.id).channels.cache.find(channel => [channel.name, channel.id].includes(args[0].replace(/[<#>]/g, '')))
  if (channel) {
    client.database.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, message.guild.id])
    client.embed.send(message, { desc: `Success! Now go ahead and give your advertisement a \`${client.config.prefix}desc\` then \`${client.config.prefix}bump\` it!` })
  } else {
    client.embed.send(message, { desc: 'Invalid channel.' })
  }
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'Server Owner'
}

/** Command Help */
exports.help = {
  name: 'init',
  usage: '<channel>',
  description: 'Setup the bot.'
}
