exports.run = async (client, message, args) => {
  if (args[0] === undefined) {
    return client.embed.send(message, { desc: 'Please specify a channel.' })
  }
  const channel = client.guilds.cache.get(message.guild.id).channels.cache.find(channel => [channel.name, channel.id].includes(args[0].replace(/[<#>]/g, '')))
  if (channel) {
    client.database.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, message.guild.id])
    client.embed.send(message, { desc: 'Success! Now go ahead and give your advertisement a `v!desc` then `v!bump` it!' })
  } else {
    client.embed.send(message, { desc: 'Invalid channel.' })
  }
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'Administrator'
}

exports.help = {
  name: 'init',
  usage: '<channel>',
  description: 'Setup the bot.'
}
