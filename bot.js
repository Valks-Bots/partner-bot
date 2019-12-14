// Stable Release
const Discord = require('discord.js')
const client = new Discord.Client()
const settings = require('./settings.json')
const sql = require('sqlite')

require('dotenv').config()

sql.open('./database.sqlite') // Create database

const DESC_MIN_LENGTH = 30
const DESC_MAX_LENGTH = 255

const lastDate = []

const commands = {
  help: (msg) => {
    msg.channel.send({
      embed: {
        title: 'Help',
        description: `The bot was created by **valk#3277**, if you have any questions or would like to suggest new features or report bugs, please send them a direct message. All commands start with \`${settings.prefix}\`.`,
        fields: [{
          name: 'invite',
          value: 'A way to invite this bot to your own guild.',
          inline: true
        },
        {
          name: 'init',
          value: 'Synchronize advertisement channel.',
          inline: true
        },
        {
          name: 'desc',
          value: 'Set the description of your advertisement.',
          inline: true
        },
        {
          name: 'preview',
          value: 'Preview your advertisement.',
          inline: true
        },
        {
          name: 'bump',
          value: 'Bump your ad to all the other guilds.',
          inline: true
        },
        {
          name: 'help',
          value: 'Useless command.',
          inline: true
        }
        ]
      }
    })
  },
  invite: (msg) => {
    sendEmbed(msg, 'I\'ve sent you a private message with the bot invite link.')
    msg.author.send(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=27649`)
  },
  bump: (msg) => {
    const ignoreCooldown = false
    const now = new Date()
    const cooldown = (5 * 60 * 1000)
    if (lastDate[msg.guild.id] === undefined) {
      lastDate[msg.guild.id] = 0
    }
    if (now - lastDate[msg.guild.id] > cooldown || ignoreCooldown) {
      // It's been more than 10 mins
      sql.all('SELECT * FROM settings').then(row => {
        msg.guild.fetchInvites().then(invites => {
          if (row.length - 1 <= 0) {
            sendEmbed(msg, 'There are no other guilds for your advertisement to go, `v!invite` and setup the bot on other guilds before trying again.')
            return
          }
          
          if (invites.size > 0) {
            const invite = invites.first()

            bumpLogic(msg, row, invite)
          } else {
            // Create invite.
            let channelID
            const channels = msg.guild.channels
            for (const c of channels) {
              const channelType = c[1].type
              if (channelType === 'text') {
                channelID = c[0]
                break
              }
            }

            const channel = channels.get(msg.guild.systemChannelID || channelID)
            channel.createInvite().then(invite => {
              bumpLogic(msg, row, invite)
              sendEmbed(msg, `Bumped sucessfully to **${row.length - 1}** guilds.`)
            })
          }
        })
      })
      lastDate[msg.guild.id] = now
    } else {
      // It's been less than 10 mins
      const remaining = Math.round(((cooldown) - (now - lastDate[msg.guild.id])) / 1000)
      sendEmbed(msg, `You must wait **${remaining} seconds** before you can use this command again.`)
    }
  },
  init: (msg) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      return sendEmbed(msg, 'You need to have the administrator permission to do this.')
    }
    const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g).slice(1)
    if (args[0] === undefined) {
      return sendEmbed(msg, 'Please specify a channel.')
    }
    const channel = client.guilds.get(msg.guild.id).channels.find('name', args[0])
    if (channel) {
      sql.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, msg.guild.id])
      sendEmbed(msg, 'Success! Now go ahead and give your advertisement a `v!desc` then `v!bump` it!')
    } else {
      sendEmbed(msg, 'Invalid channel.')
    }
  },
  desc: (msg) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      return sendEmbed(msg, 'You need to have the administrator permission to do this.')
    }
    const desc = msg.content.slice(settings.prefix.length).trim().split(/ +/g).slice(1).join(' ')
    if (desc === undefined || desc === '') {
      return sendEmbed(msg, 'Specify a guild description. Note that your guild invite will be attached automatically.')
    }

    if (desc.length > settings.ad.desc.max) {
      return sendEmbed(msg, `Description can not be more then ${DESC_MAX_LENGTH} characters long.`)
    }
    if (desc.length < settings.ad.desc.min) {
      return sendEmbed(msg, `Description must have at least ${DESC_MIN_LENGTH} characters in it.`)
    }
    if (desc.includes('http') || desc.includes('@everyone') || desc.includes('@here')) {
      return msg.channel.send('No links or mentions in the description please.')
    }
    sql.run('UPDATE settings SET desc = ? WHERE guildid = ?', [desc, msg.guild.id])
    sendEmbed(msg, 'Description sucessfully updated.')
  },
  preview: (msg) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      return sendEmbed(msg, 'You need to have the administrator permission to do this.')
    }
    sql.get('SELECT * FROM settings WHERE guildid = ?', [msg.guild.id]).then(row => {
      const str = [
                `__**${msg.guild.name}**__\n`,
                `${row.desc} \`[Invite will Appear Here]\``
      ]

      msg.channel.send(str.join('\n'))
    })
  }
}

client.on('ready', () => {
  // We have connected!
  client.user.setActivity(`${settings.prefix}help`, {
    type: 'PLAYING'
  })
  console.log(`${client.user.tag} running on ${client.guilds.size} guilds with ${client.users.size} users.`)
  // Create the tables if they do not exist.
  sql.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR)').then(() => {
    for (const guild of client.guilds.values()) {
      sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
    }
  })
})

client.on('guildCreate', (guild) => {
  console.log(`I have joined the guild ${guild.name}`)
  sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
})

client.on('guildDelete', (guild) => {
  console.log(`I have left the guild ${guild.name}`)
  sql.run('DELETE * FROM settings WHERE guildid = ?', [guild.id])
})

client.on('message', async msg => {
  // Handle the bot and channel type.
  if (msg.author.bot) return // We don't want the bot reacting to itself..
  if (msg.channel.type !== 'text') return // Lets focus on the use of text channels.

  if (msg.content.startsWith(settings.prefix + 'ping')) {
    const m = await msg.channel.send('Ping?')
    m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`)
    return
  }

  // Handle Commands Module
  if (!msg.content.startsWith(settings.prefix)) return // The start of commands.
  console.log(`[${msg.guild.name}] ${msg.author.tag} >> ${msg.content}`) // Log commands.
  const cmd = msg.content.toLowerCase().slice(settings.prefix.length).split(' ')[0] // Grab the command.
  if (commands.hasOwnProperty(cmd)) { // Check to see if commands has the command.
    commands[cmd](msg) // Push the cmd to the commands object.
  }
})

function bumpLogic (msg, row, invite) {
  for (let i = 0; i < row.length; i++) {
    const guild = client.guilds.get(row[i].guildid)
    let desc = null

    for (let a = 0; a < row.length; a++) {
      const temp = client.guilds.get(row[a].guildid)
      if (temp) {
        if (temp.id === msg.guild.id) {
          if (!msg.guild.channels.has(row[a].partner)) {
            sendEmbed(msg, `You must first initialize a channel for the bot in ${msg.guild.name} with \`${settings.prefix}init\`before you can bump your server.`)
            lastDate[msg.guild.id] = 0
            return
          }
          desc = row[a].desc
          break
        }
      }
    }

    if (desc === undefined || desc === null) {
      lastDate[msg.guild.id] = 0
      return sendEmbed(msg, `A description for ${msg.guild.name} has not been set yet. Please set one.`)
    }
    if (guild) {
      if (guild.channels.has(row[i].partner) && guild.id !== msg.guild.id) {
        const str = [
                    `__**${msg.guild.name}**__`,
                    `${desc} ${invite.url}`
        ]

        guild.channels.get(row[i].partner).send(str.join('\n\n'))
      }
    }
  }
}

function sendEmbed (msg, str) {
  const embedObject = {
    embed: {
      description: str
    }
  }

  if (!msg.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
    return msg.channel.send('I need the embed links permission.')
  }

  if (!msg.channel.permissionsFor(client.user).has('MANAGE_MESSAGES')) {
    return msg.channel.send('I need manage messages permission.')
  }

  msg.channel.send(embedObject)
}

client.login(process.env.BOT_TOKEN)
