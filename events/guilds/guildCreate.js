const discord = require('discord.js')

module.exports = async (Client, guild) => {
    await Client.createGuild(guild)
    deploySlashCommands(Client)

}
