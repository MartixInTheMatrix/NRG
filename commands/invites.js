const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");


module.exports.execute = async (Client, interaction) => {
    interaction.guild.invites.fetch()
        .then

        (invites => {

            let guildInvites = Array.from(invites, ([code, value]) => ({ code, value}))
            let desc = ''
            let number = 1

            guildInvites.forEach((invite)=>{
                if (invite.value['uses'] >= 1) {
                    desc = desc + `\n> \`#${number}\` <@${invite.value['inviter'].id}> - **utilisations**・${invite.value['uses']} - **code**・${invite.code}\n`
                number = number + 1
                }
            })
                

            let embed = new Discord.MessageEmbed()
            .setAuthor('Invitations du serveur', interaction.guild.iconURL())
            .setDescription(desc)
            .setColor('#2f3136')
            interaction.reply({embeds:[embed]});

        })
}

module.exports.help = COMMANDS.INVITES;
