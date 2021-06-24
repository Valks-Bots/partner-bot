/**
 * Bump an advertisement.
 * @module commands/bump
 */

const prettyMS = require('pretty-ms')
const lastDate = []

/**
 * Execute command
 * @param {Discord.Client} client - The Discord client
 * @param {Discord.Message} message - The message of the command
 * @param {string} args - The arguments of the command
 */
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
    client.database.all('SELECT * FROM settings').then(async row => {
      message.guild.fetchInvites().then(async invites => {
        if (row.length - 1 <= 0) {
          client.embed.send(message, { desc: 'There are no other guilds for your advertisement to go, `v!invite` and setup the bot on other guilds before trying again.' })
          return
        }

        let invite

        if (invites.size > 0) {
          invite = invites.first() // Invite Exists
        } else {
          let channelID // Invite does not exist. Create one.
          const channels = message.guild.channels.cache
          for (const c of channels) {
            const channelType = c[1].type
            if (channelType === 'text') {
              channelID = c[0]
              break
            }
          }

          const channel = channels.get(message.guild.systemChannelID || channelID)
          invite = await channel.createInvite()
        }

        bumpLogic(client, message, row, invite)
        lastDate[message.guild.id] = now
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
        const guildInfo = getGuildInfo(message.guild)
        guild.channels.cache.get(row[i].partner).send({
          embed: {
            title: guildInfo.name,
            description: `${desc}\n\n[Invite](${invite.url})`,
            fields: [
              {
                name: `Members: \`${message.guild.members.cache.size}\` (\`${guildInfo.humans}%\` Humans | \`${guildInfo.bots}%\` Bots)`,
                value: `Online: \`${guildInfo.online}\` | Idle: \`${guildInfo.idle}\` | DnD: \`${guildInfo.dnd}\``,
                inline: false
              },
              
              



            ],
            thumbnail: {
              url: message.guild.iconURL()
            },
            footer: {
              text: `Created: ${message.guild.createdAt} | Region: ${message.guild.region}`
            }
          }
        })
      }
    }
  }

  client.embed.send(message, { desc: `Bumped to ${row.length - 1} guilds!` })
}

function getGuildInfo (guild) {
  const members = guild.members.cache
  const emojis = guild.emojis.cache

  let online = 0
  let idle = 0
  let dnd = 0
  let humans = 0
  let bots = 0

  let humanPercent = 0
  let botPercent = 0

  const emotes = []

  members.forEach(member => {
    const status = member.presence.clientStatus
    if(member.user.bot) return bots++
    else humans++

    if (!status) return
      
    if (status.web === 'online' || status.desktop === 'online' || status.mobile === 'online') {
      online++
    }

    if (status.web === 'idle' || status.desktop === 'idle' || status.mobile === 'idle') {
      idle++
    }
    if (status.web === 'dnd' || status.desktop === 'dnd' || status.mobile === 'dnd') {
      dnd++
    }
  })

  emojis.forEach(emoji => {
    emotes.push(`${emoji.toString()}`)
  })

  humanPercent = Math.round((humans / members.size) * 100)
  botPercent = Math.round((bots / members.size) * 100)

  return {
    name: guild.name,
    online: online,
    idle: idle,
    dnd: dnd,
    humans: humanPercent,
    bots: botPercent,
    emojis: emotes
  }
}

/** Command Config */
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

/** Command Help */
exports.help = {
  name: 'bump',
  usage: '',
  description: 'Bump your advertisement.'
}
