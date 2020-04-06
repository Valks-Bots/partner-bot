exports.run = async (client, message, args) => {
  const msg = await client.embed.send(message, { desc: 'Ping?' }, false)
  await client.embed.edit(message, msg, { desc: `<:kittywow:521494525571629076> Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms` })
}

exports.conf = {
  enabled: true,
  aliases: ['p'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'ping',
  usage: '',
  description: 'Send a ping and receive a pong!'
}
