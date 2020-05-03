exports.run = async (client, message, args) => {
  message.guild.leave()
}

exports.conf = {
  enabled: true,
  aliases: ['p'],
  guildOnly: false,
  permLevel: 'Bot Owner'
}

exports.help = {
  name: 'leave',
  usage: '',
  description: 'Leave the guild I\'m currently in.'
}
