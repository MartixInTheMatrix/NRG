const discord = require('discord.js')
const { deploySlashCommands } = require('../../startup')

module.exports = async (Client, guild) => {
    await Client.createGuild(guild)
    deploySlashCommands(Client, guild)
    let ch = Client.channels.cache.get('851110066135236630')
    let embed = new discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor('Nouveau serveur: ' + guild.name + ' !', guild.iconURL())
    .setDescription(`> ID: ${guild.id} \n> Membres : ${guild.members.cache.size} \n> Owner: ${guild.members.cache.get(guild.ownerId).user.username}`)
    ch.send({embeds:[embed]})
}
