module.exports = async (client, guild) => {
  client.logger.log(`I have left the guild ${guild.name}`)
  client.database.run('DELETE FROM settings WHERE guildid = ?', [guild.id]).catch(console.error)
}
