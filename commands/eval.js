const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.execute = async (Client, interaction, dbGuild, today) => {
    let date = ''
    let membres = ''
    let evo = ''
    let bilan = true
    let bilantxt = ''

    if(Date.now() - interaction.guild.createdAt > 1000*60*60*24*7*8) {
        date = `<:x_:816725180595568691> Votre serveur doit avoir **au moins 8 semaines d’existence**.`
        bilan = false
    }else{
        date = '<:check:817727531385225229>' + ` Eligible !`
    }

    if(interaction.guild.memberCount < 500){
        membres = `<:x_:816725180595568691> Votre serveur doit avoir **au moins 500 membres**.`
        bilan = false
    }else{
        membres = '<:check:817727531385225229>' + ` Eligible !`
    }

    let Uauj = 'rien';
    let Uhier = 'rien';
    let Uj3 = 'rien';
    let Usemaine = 'rien';
      if(!dbGuild.stats[dbGuild.stats.length - 1]){

        Uauj = 0
      }
      if(!dbGuild.stats[dbGuild.stats.length - 2]){

        Uhier = 0
      }
      if(!dbGuild.stats[dbGuild.stats.length - 4]){

        Uj3 = 0
    }
    if(!dbGuild.stats[dbGuild.stats.length - 8]){
        Usemaine = 0
    }


    if(Uauj == 'rien'){
        Uauj = dbGuild.stats[dbGuild.stats.length - 1][1].gtm
    }
    if(Uhier == 'rien'){
        Uhier = dbGuild.stats[dbGuild.stats.length - 2][1].gtm
    }
    if(Uj3 == 'rien'){
        Uj3 = dbGuild.stats[dbGuild.stats.length - 4][1].gtm
    }
    if(Usemaine == 'rien'){
        Usemaine = dbGuild.stats[dbGuild.stats.length - 8][1].gtm
    }

    let compiled = Uauj + Uhier + Uj3 + Usemaine
    if (compiled < 100) {
        evo = `<:x_:816725180595568691> Vous devez avoir **au moins 100 personnes qui rejoignent par semaine.**`
        bilan = false
    } else {
        evo = `<:check:817727531385225229> Eligible`
    }
    if (bilan === false) {
        bilantxt = `<:x_:816725180595568691> **Votre serveur n'est pas éligible !**`
    } else {
        bilantxt = `<:check:817727531385225229> **Votre serveur est éligible !**`
    }
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor(`Eligibilité au programme partenaire du serveur`, interaction.guild.iconURL())
    .addField(`Date de création`, date)
    .addField(`Membres au total`, membres)
    .addField(`Evolution des membres`, evo)
    .addField(`**__Bilan__**`, bilantxt)

    interaction.reply({embeds:[embed]});
}

module.exports.help = COMMANDS.EVAL;
