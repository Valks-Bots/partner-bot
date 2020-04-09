const config = {
  statusURL: 'https://srhpyqt94yxb.statuspage.io/api/v2/status.json',
  prefix: 'v!',
  botGuildID: '689327932799451186',
  ownerID: '453640548985602048',
  ad: {
    desc: {
      min_length: 30,
      max_length: 255
    }
  },
  botMaintenance: false,
  deleteCommands: true,
  deleteTime: 30000,
  emojis: {
    delete: '689328295958806639'
  },
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => {
        return new Promise((resolve, reject) => {
          resolve(true)
        })
      }
    },
    {
      level: 2,
      name: 'Moderator',
      check: (client, message) => {
        return new Promise((resolve, reject) => {
          client.database.get('SELECT modrole FROM settings WHERE guildid = ?', [message.guild.id]).then(row => {
            const modRole = message.guild.roles.cache.find(r => r.id === row.modrole)
            if (modRole === undefined) {
              reject(null)
            } else {
              resolve(message.member.roles.cache.has(modRole.id))
            }
          })
        })
      }
    },
    {
      level: 3,
      name: 'Administrator',
      check: (client, message) => {
        return new Promise((resolve, reject) => {
          client.database.get('SELECT adminrole FROM settings WHERE guildid = ?', [message.guild.id]).then(row => {
            const adminRole = message.guild.roles.cache.find(r => r.id === row.adminrole)
            if (adminRole === undefined) {
              reject(null)
            } else {
              resolve(message.member.roles.cache.has(adminRole.id))
            }
          })
        })
      }
    },
    {
      level: 4,
      name: 'Server Owner',
      check: (client, message) => {
        return new Promise((resolve, reject) => {
          resolve(message.member.id === message.guild.owner.id)
        })
      }
    },
    {
      level: 10,
      name: 'Bot Owner',
      check: (client, message) => {
        return new Promise((resolve, reject) => {
          resolve(message.member.id === config.ownerID)
        })
      }
    }
  ]
}

module.exports = config
