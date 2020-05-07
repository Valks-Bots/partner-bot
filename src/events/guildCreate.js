/**
 * Fires when the bot joins a new guild
 * @event guildCreate
 */

module.exports = async (client, guild) => {
  client.logger.log(`I have joined the guild ${guild.name}`)
  client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
}
