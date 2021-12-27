const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const em = require('../util/emojis')

module.exports.execute = async (Client, interaction, dbGuild) => {
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor('Panel de configuration de NRG', Client.user.displayAvatarURL())
    .setDescription(`> Veuillez choisir un module à ajouter et a configurer`)
    let emCaptcha = '❌'
    let emBvn = '✅'
    let emMod = '✅'
    console.log(dbGuild)
    if(dbGuild.captcha){
        emCaptcha = '✅'
    }
    if(!dbGuild.bvnID || dbGuild.bvnID == 'false'){
        emBvn = '❌'
    }
    if(!dbGuild.modmailID || dbGuild.modmailID == 'false'){
        emMod = '❌'
    }
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
            .setCustomId('config')
            .setPlaceholder('Choisissez un module à configurer')
            .addOptions([
                {
                    label: 'Captcha à l\'arrivée',
                    description: 'Le membre qui rejoint doit passer une captcha par reaction',
                    value: 'captcha',
                    emoji: emCaptcha
                },
                {
                    label: 'Salon de bienvenue / départs',
                    description: 'Salon de logs des arrivées et départs du serveur',
                    value: 'bvn',
                    emoji: emBvn
                },
                {
                    label: 'Modmail',
                    description: 'Système de tickets support',
                    value: 'modmail',
                    emoji: emMod
                },
            ]),
    );

    interaction.reply({embeds:[embed], components:[row]})
}

module.exports.help = COMMANDS.SETUP;
