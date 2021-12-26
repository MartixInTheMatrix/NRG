const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const em = require('../util/emojis')

module.exports.execute = async (Client, interaction, dbGuild, today, dbUser) => {

    interaction.reply('Vos xp: ' + dbUser.gxp) 
}

module.exports.help = COMMANDS.ME;
