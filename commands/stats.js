const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");

module.exports.execute = async (Client, interaction, dbGuild, today) => {
    function bool(value){
        if(value < 0){
          return '-'
        }else if(value == 0){
          return '~'
        }else{
          return '+'
        }
      }


    let Mauj = 'rien';
    let Mhier = 'rien';
    let Mj3 = 'rien';
    let Msemaine = 'rien';

    let Uauj = 'rien';
    let Uhier = 'rien';
    let Uj3 = 'rien';
    let Usemaine = 'rien';
      if(!dbGuild.stats[dbGuild.stats.length - 1]){
        Mauj = 0
        Uauj = 0
      }
      if(!dbGuild.stats[dbGuild.stats.length - 2]){
        Mhier = 0
        Uhier = 0
      }
      if(!dbGuild.stats[dbGuild.stats.length - 4]){
        Mj3 = 0
        Uj3 = 0
    }
    if(!dbGuild.stats[dbGuild.stats.length - 8]){
        Msemaine = 0
        Usemaine = 0
    }

    if(Mauj == 'rien'){
        Mauj = dbGuild.stats[dbGuild.stats.length - 1][1].gtxp
    }
    if(Mhier == 'rien'){
        Mhier = dbGuild.stats[dbGuild.stats.length - 2][1].gtxp
    }
    if(Mj3 == 'rien'){
        Mj3 = dbGuild.stats[dbGuild.stats.length - 4][1].gtxp
    }
    if(Msemaine == 'rien'){
        Msemaine = dbGuild.stats[dbGuild.stats.length - 8][1].gtxp
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

    let embed = new Discord.MessageEmbed()
    .setAuthor("Relevé des données de " + Client.guilds.cache.get(dbGuild.guildID).name + "\n(" + dbGuild.guildID + ")", interaction.member.guild.iconURL({format: 'png', dynamic: 'true'}))
    .setDescription(`**__Messages__**\`\`\`diff\n${bool(Mauj)} Aujourd'hui » `+ Mauj + `\n${bool(Mhier)} Hier » `+ Mhier + `\n${bool(Mj3)} Il y a 3 jours » `+ Mj3 + `\n${bool(Msemaine)} La semaine dernière » `+ Msemaine +`\n${bool(dbGuild.gxp)} Total  `+ dbGuild.gxp + `\`\`\` **__Membres__**\`\`\`diff\n${bool(Uauj)} Aujourd'hui » `+ Uauj + `\n${bool(Uhier)} Hier » `+ Uhier + `\n${bool(Uj3)} Il y a 3 jours » `+ Uj3 + `\n${bool(Usemaine)} La semaine dernière » `+ Usemaine + `\n${bool(interaction.guild.members.cache.size)} Total  `+ interaction.guild.members.cache.size + `\`\`\``)
    .setColor('#2f3136')
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.STATS;
