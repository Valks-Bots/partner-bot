exports.run = async (client, message, args) => {
  client.embed.send(message, { desc: 'I\'ve sent you a private message with the bot invite link.' })
  message.author.send(`<https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=27649>`)
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'invite',
  usage: '',
  description: 'Invite the bot.'
}
