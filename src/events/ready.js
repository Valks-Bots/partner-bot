/**
 * Fires when the bot starts up
 * @module events/ready
 * @param {Discord.Client} client - The Discord client
 */

module.exports = async client => {
  client.user.setActivity(`${client.config.prefix}help`, { type: 'PLAYING' })

  client.logger.log(`${client.user.tag} running on ${client.guilds.cache.size} guilds with ${client.users.cache.size} users.`)

  client.database.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR)').then(() => {
    for (const guild of client.guilds.cache.values()) {
      client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
    }
  })
}
