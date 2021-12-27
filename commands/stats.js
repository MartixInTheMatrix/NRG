const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");

module.exports.execute = async (Client, interaction, dbGuild, today) => {
  let val = interaction.guild.id

	if(interaction.options._hoistedOptions[0]){
		val = interaction.options._hoistedOptions[0].value
	}
  dbGuild = await Client.getGuild(Client.guilds.cache.get(val))
    function bool(value){
        if(value < 0){
          return '-'
        }else if(value == 0){
          return '~'
        }else{
          return '+'
        }
      }

let stats = Client.releve(dbGuild)
    let embed = new Discord.MessageEmbed()
    .setAuthor("Relevé des données de " + Client.guilds.cache.get(dbGuild.guildID).name + "\n(" + dbGuild.guildID + ")", Client.guilds.cache.get(dbGuild.guildID).iconURL({format: 'png', dynamic: 'true'}))
    .setDescription(`**__Messages__**\n\`\`\`diff\n${bool(stats[0])} Aujourd'hui » `+ stats[0] + `\n${bool(stats[1])} Hier » `+ stats[1] + `\n${bool(stats[2])} Il y a 3 jours » `+ stats[2]+ `\n${bool(stats[3])} La semaine dernière » `+ stats[3]+`\n${bool(dbGuild.gxp)} Total  `+ dbGuild.gxp +`\`\`\`` + '\n**__Membres__**\n' + `\`\`\`diff\n${bool(stats[4])} Aujourd'hui » `+ stats[4] + `\n${bool(stats[5])} Hier » `+ stats[5] + `\n${bool(stats[6])} Il y a 3 jours » `+ stats[6]+ `\n${bool(stats[7])} La semaine dernière » `+ stats[7] + `\`\`\``)
    .setColor('#2f3136')
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.STATS;
