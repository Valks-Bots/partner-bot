exports.normal = () => {

}

exports.custom = (client, msg, emojiID) => {
  msg.react(client.guilds.cache.get(client.config.botGuildID).emojis.cache.get(emojiID)).catch(console.error)
}

exports.guild = (message, msg, emojiID) => {
  msg.react(message.guild.emojis.cache.get(emojiID))
}

exports.trash = (message, msg) => {
  const client = message.client
  const emoteDelete = client.config.emojis.delete

  this.custom(client, msg, emoteDelete)

  const filter = (reaction, user) => {
    return reaction.emoji.id === emoteDelete && user.id === message.author.id
  }

  const collector = msg.createReactionCollector(filter, { time: client.config.deleteTime })
  collector.on('collect', () => {
    if (!message.deleted) { message.delete().catch() }
    if (!msg.deleted) { msg.delete().catch() }

    collector.stop()
  })
  collector.on('end', () => {
    // !msg.deleted property does not seem to be correct at all times. (must be error on discord.js API end)
    // if (!msg) {  }
    msg.reactions.removeAll().catch()
  })
}
