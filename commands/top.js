const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.execute = async (Client, interaction, dbGuild, today) => {
    let top = await Client.all()

    let msg = top.sort(function(a, b) {
        return a.gxp - b.gxp;
      });
    top = msg.reverse()
    let desc = '';
    let i = 1;
    let u
    let index
    top.forEach(g => {
        if(g.guildID == interaction.guild.id){
        u = g
        index = i
    }
        i++
        if(i > 20)return;
        if(!Client.guilds.cache.get(g.guildID))return;
        desc = desc + `\n> \`#${i}\` **${Client.guilds.cache.get(g.guildID).name}** - **messages**・ ${g.gxp} - **membres**・ ${Client.guilds.cache.get(g.guildID).members.cache.size}`
        
    });
    desc = desc + `\n\n __Vous » \`#${index + 1}\` - **messages**・ ${u.gxp} - **membres**・ ${Client.guilds.cache.get(u.guildID).members.cache.size} __`
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor('Leaderboard des serveurs', Client.user.displayAvatarURL())
    .setDescription(desc)
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.TOP;
