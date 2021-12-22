const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.execute = async (Client, interaction) => {
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor('Panel d\'aide de NRG', Client.user.displayAvatarURL())
    
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.HELP;
