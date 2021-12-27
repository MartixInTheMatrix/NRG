const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const em = require('../util/emojis')

module.exports.execute = async (Client, interaction) => {
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor('Panel d\'aide de NRG', Client.user.displayAvatarURL())
    .setDescription(`**${em.stats} » Statistiques Générales**\n> \`guild\`・ Informations et statistiques sur le serveur\n> \`me\`・ Informations et statistiques sur votre profil \n> \`stats\`・ Relevé des donées brutes \n> \`top\`・ Leaderboard des serveurs par les messages \n> \`invites\`・ Informations sur les invitations du serveur\n\n **${em.chart}» Statistiques avancées** \n> \`eval\`・ Teste l'égilibilité du serveur au discord partner program \n> \`analyse\`・ Effectue un test d'activité du serveur \n\n**${em.reglages}» Bot**\n> \`nrg\`・ Informations sur le bot \n> \`ping\`・ Informations sur le status réseau du bot \n\n _Si vous avez un problème avec les slash commandes, @ le bot._ \n\n **Je t'invite à regarder ces liens :**\n [Invitation](https://discord.com/api/oauth2/authorize?client_id=814805186181857290&permissions=8&scope=bot)・[Support](https://discord.gg/PNbsQWQpAA)`)
    .setFooter('Dev by Martix#2021 all rights reserved © 2021 - 2022')
    .setImage('https://cdn.discordapp.com/attachments/889596705878704138/924634825841864744/NRG.gif')
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.HELP;
