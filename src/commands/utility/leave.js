/**
 * The bot leaves the guild the command was executed in.
 * @module commands/leave
 */

/**
 * Execute command
 * @param {Discord.Client} client - The Discord client
 * @param {Discord.Message} message - The message of the command
 * @param {string} args - The arguments of the command
 */
exports.run = async (client, message, args) => {
  message.guild.leave()
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: ['p'],
  guildOnly: false,
  permLevel: 'Bot Owner'
}

/** Command Help */
exports.help = {
  name: 'leave',
  usage: '',
  description: 'Leave the guild I\'m currently in.'
}
