exports.run = async (client, message, args) => {
  client.database.get('SELECT * FROM settings WHERE guildid = ?', [message.guild.id]).then(row => {
    const str = [
                  `__**${message.guild.name}**__\n`,
                  `${row.desc === null ? 'No description set yet.' : row.desc} \`[Invite will Appear Here]\``
    ]

    client.embed.send(message, { desc: str.join('\n') })
  })
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'Server Owner'
}

exports.help = {
  name: 'preview',
  usage: '',
  description: 'Preview your advertisement.'
}
