exports.run = async (client, message, args) => {
  client.embed.send(message, {
    title: 'Help',
    code: true,
    desc: `The bot was created by **${client.users.cache.get(client.config.ownerID).tag}**, if you have any questions or would like to suggest new features or report bugs, please send them a direct message. All commands start with \`${client.config.prefix}\`.`,
    fields: [{
      name: 'invite',
      value: 'A way to invite this bot to your own guild.'
    },
    {
      name: 'init',
      value: 'Synchronize advertisement channel.'
    },
    {
      name: 'desc',
      value: 'Set the description of your advertisement.'
    },
    {
      name: 'preview',
      value: 'Preview your advertisement.'
    },
    {
      name: 'bump',
      value: 'Bump your ad to all the other guilds.'
    },
    {
      name: 'help',
      value: 'Useless command.'
    }
    ]
  })
}

exports.conf = {
  enabled: true,
  aliases: ['h'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'help',
  usage: '',
  description: 'Helpful command.'
}
