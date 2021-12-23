const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const em = require('../util/emojis')
const ms = require('ms')
module.exports.execute = async (Client, interaction, dbGuild) => {

    if(!interaction.guild.members.cache.get(interaction.user.id).permissions.has("ADMINISTRATOR")){
        let UNembed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('ERREUR')
        .setDescription('il vous faut les permissions `ADMINISTRATOR` pour effectuer cette commande !')
        interaction.reply({embeds:[UNembed]})
    }else{
    let channel = Client.channels.cache.get(interaction.options._hoistedOptions[0].value)
    let time = interaction.options._hoistedOptions[1].value
    let role = false
    let res = 1
    if(interaction.options._hoistedOptions[2]){
        role = interaction.guild.roles.cache.get(interaction.options._hoistedOptions[2].value)
    }

    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setTitle('Test commencé !')
    .setDescription('Le test a été commencé dans <#' + channel.id + '>, veuillez ne pas mentionner everyone ou here, les statistiques seront alors biaisées.')
    interaction.reply({embeds:[embed]})
    let testEmbed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor('Test d\'activité !', interaction.guild.iconURL())
    .setDescription('**Réagissez à la réaction ✅**, ce message donnera lieu à des statistiques sur les membres du serveur. \n\n> **Durée du test: ' + time + '**')
    let msg = await channel.send({embeds:[testEmbed]})
    if(role){
        let m = await channel.send('<@' + role.id + ">")
        setTimeout(async()=>{
            await m.delete()
        },1000)
    }
    await msg.react('✅')
    setTimeout(async ()=>{
        res = msg.reactions.cache.get('✅').count 
        await msg.delete()
        let resEmbed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('Test terminé !', interaction.guild.iconURL())
        .setDescription('**Réactions: ' + res + '\n\nBien joué à tous !**')
        channel.send({embeds:[resEmbed]})

        let g = Client.guilds.cache.get(interaction.guild.id)
        let pourcentage = (res * 100 / g.members.cache.size).toFixed(2) + '%'

        let statsEmbed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('Résultats du test d\'activité du serveur', g.iconURL())
        .setDescription('Il y a **' + pourcentage + '** des membres qui sont actifs sur ce serveur.')

        let chan = Client.channels.cache.get(interaction.channel.id)
        chan.send({embeds:[statsEmbed]})
    }, ms(time))
    }
}

module.exports.help = COMMANDS.ANALYSE;
