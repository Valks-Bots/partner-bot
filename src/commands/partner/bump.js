const prettyMS = require('pretty-ms')
const lastDate = []

exports.run = async (client, message, args) => {
  const ignoreCooldown = false
  const now = new Date()
  const cooldown = (5 * 60 * 1000)

  if (!message.guild.me.hasPermission('CREATE_INSTANT_INVITE') || !message.guild.me.hasPermission('MANAGE_GUILD')) {
    client.embed.send(message, { desc: 'I need the `CREATE_INSTANT_INVITE` and `MANAGE_GUILD` permissions to bump.' })
    return
  }

  if (lastDate[message.guild.id] === undefined) {
    lastDate[message.guild.id] = 0
  }
  if (now - lastDate[message.guild.id] > cooldown || ignoreCooldown) {
    // It's been more than the set cooldown
    client.database.all('SELECT * FROM settings').then(row => {
      message.guild.fetchInvites().then(invites => {
        if (row.length - 1 <= 0) {
          client.embed.send(message, { desc: 'There are no other guilds for your advertisement to go, `v!invite` and setup the bot on other guilds before trying again.' })
          return
        }

        if (invites.size > 0) {
          const invite = invites.first()

          bumpLogic(client, message, row, invite)
        } else {
          // Create invite.
          let channelID
          const channels = message.guild.channels.cache
          for (const c of channels) {
            const channelType = c[1].type
            if (channelType === 'text') {
              channelID = c[0]
              break
            }
          }

          const channel = channels.get(message.guild.systemChannelID || channelID)
          channel.createInvite().then(invite => {
            bumpLogic(client, message, row, invite)
            client.embed.send(message, { desc: `Bumped sucessfully to **${row.length - 1}** guilds.` })
            lastDate[message.guild.id] = now
          })
        }
      }).catch(console.error)
    })
  } else {
    // It's been less than the set cooldown.
    const remaining = prettyMS(Math.round((cooldown) - (now - lastDate[message.guild.id])), { verbose: true, unitCount: 3, secondsDecimalDigits: 0 })
    client.embed.send(message, { desc: `You must wait **${remaining}** before you can use this command again.` })
  }
}

function bumpLogic (client, message, row, invite) {
  for (let i = 0; i < row.length; i++) {
    const guild = client.guilds.cache.get(row[i].guildid)
    let desc = null

    for (let a = 0; a < row.length; a++) {
      const temp = client.guilds.cache.get(row[a].guildid)
      if (temp) {
        if (temp.id === message.guild.id) {
          if (!message.guild.channels.cache.has(row[a].partner)) {
            client.embed.send(message, { desc: `You must first initialize a channel for the bot in ${message.guild.name} with \`${client.config.prefix}init\` before you can bump your server.` })
            lastDate[message.guild.id] = 0
            return
          }
          desc = row[a].desc
          break
        }
      }
    }

    if (desc === undefined || desc === null) {
      lastDate[message.guild.id] = 0
      return client.embed.send(message, { desc: `A description for ${message.guild.name} has not been set yet. Please set one.` })
    }
    if (guild) {
      if (guild.channels.cache.has(row[i].partner) && guild.id !== message.guild.id) {
        guild.channels.cache.get(row[i].partner).send({
          embed: {
            title: message.guild.name,
            description: desc,
            fields: [
              {
                name: 'Invite',
                value: invite.url
              }
            ],
            thumbnail: {
              url: message.guild.iconURL()
            }
          }
        })
      }
    }
  }

  client.embed.send(message, { desc: `Bumped to ${row.length - 1} guilds!` })
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'bump',
  usage: '',
  description: 'Bump your advertisement.'
}
