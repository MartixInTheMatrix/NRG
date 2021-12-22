const Discord = require('discord.js')
const cl = require('../util/colors')
const em = require('../util/emojis')
const QuickChart = require('quickchart-js');
const { COMMANDS } = require("../util/commands");




module.exports.execute = async(Client, interaction, dbGuild, today) => {
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
const membres  = interaction.guild.members.cache.filter(member => !member.user.bot).size - interaction.guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR") && !member.user.bot).size
      
const membresTotaux = new QuickChart();
membresTotaux.setConfig({
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [membres, interaction.guild.members.cache.filter(member => member.user.bot).size, interaction.guild.members.cache.filter(member => member.permissions.has("ADMINISTRATOR") && !member.user.bot).size],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
          ],
          label: 'Membres du serveur',
        },
      ],
      labels: ['Utilisateurs', 'Bots', 'Admins'],
    },
    options: {
      legend: {
        labels: {
          fontColor: '#fff',
        }
      },
      title: {
        fontColor: "#fff",
        display: true,
        text: 'Membres du serveur',
      },
      plugins: {
        backgroundImageUrl: 'https://cdn.discordapp.com/attachments/816650927254536214/816756917513748490/image0.png',
      }	
    },
  });



    const messagesTemps = new QuickChart();
messagesTemps.setConfig(
    {
      type:"bar",
      data: {
        fontColor: 'rgb(255, 255, 255)',
      labels: ['1 sem','6j','5j','4j','3j','2j', 'Hier','Auj'],
        datasets: [
          
        {
          "type": "line",
          "label": "Messages du serveur",
          "backgroundColor": "rgba(75, 192, 192, 0.5)",
          "borderColor": cl.rose,
          "fill": false,
          "data": [
            stats[0],
            stats[1],
            stats[2],
            stats[3],
          ]
        }
      ],
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
          fontColor: 'rgb(255, 255, 255)'
        },
        title: {
          display: true,
          text: 'Messages du serveur',
          fontColor: 'rgb(255, 255, 255)'
        },
        plugins: {
          backgroundImageUrl: 'https://cdn.discordapp.com/attachments/816650927254536214/816756917513748490/image0.png',
        }	
      },
      
    }
  )

  const membresTemps = new QuickChart();
membresTemps.setConfig(
  {
    type: 'bar',
    data: {
      labels: ['1 sem','6j','5j','4j','3j','2j', 'Hier','Auj'],
      datasets: [
        {
          label: 'Membres du serveur',
          backgroundColor: cl.rose,
          borderColor: cl.rose,
          stack: 'Stack 0',
          data: [
            stats[4],
            stats[5],
            stats[6],
            stats[7]
          ],
        },
        
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Evolution des membres',
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
        plugins: {
          backgroundImageUrl: 'https://cdn.discordapp.com/attachments/816650927254536214/816756917513748490/image0.png',
        }	
      },
      
    }
  )
  
    let MENUembed = new Discord.MessageEmbed()
    .setTitle('Menu guild')
    .setColor(cl.invisible)
    .setDescription('**Réagir aux réactions pour recevoir des informations diverses sur le serveur »** \n\n> 🏠 ・ Menu \n> 🗂 ・ Informations générales \n> ✉️ ・ Statistiques sur les messages \n> 👤 ・ Statistiques sur les membres \n> 📊 ・ Toutes les statistiques / relevé des donnés')
    
    let MSGembed = new Discord.MessageEmbed()
    .setTitle('**' + em.send + ' Messages envoyés**')
    .setColor(cl.invisible)
    .setDescription(`\`\`\`diff\n${bool(stats[0])} Aujourd'hui » `+ stats[0] + `\n${bool(stats[1])} Hier » `+ stats[1] + `\n${bool(stats[2])} Il y a 3 jours » `+ stats[2]+ `\n${bool(stats[3])} La semaine dernière » `+ stats[3]+`\n${bool(dbGuild.gxp)} Total  `+ dbGuild.gxp +`\`\`\``)
    .setImage(messagesTemps.getUrl()) 

    let INFOembed = new Discord.MessageEmbed()
    .setAuthor('» Informations sur le serveur ' +interaction.guild.name, interaction.guild.iconURL())
    .setColor(cl.invisible)
    .setDescription(`> **${em.owner} Owner »** ${interaction.guild.fetchOwner().username} \n> **${em.time} Crée le »** ${interaction.guild.createdAt}\n> **${em.world} Région »** ${interaction.guild.region}\n> **${em.verified} Vérifié »** ${interaction.guild.verified}\n> **${em.online} En ligne »** ${interaction.guild.members.cache.filter(m => m.presence?.status === 'online' || 'dnd').size}`)
    .setImage(membresTotaux.getUrl()) 

    let MMBembed = new Discord.MessageEmbed()
    .setTitle('**' + em.join + ' Membres ayants rejoints**')
    .setColor(cl.invisible)
    .setDescription(`\`\`\`diff\n${bool(stats[4])} Aujourd'hui » `+ stats[4] + `\n${bool(stats[5])} Hier » `+ stats[5] + `\n${bool(stats[6])} Il y a 3 jours » `+ stats[6]+ `\n${bool(stats[7])} La semaine dernière » `+ stats[7] + `\`\`\``)
    .setImage(membresTemps.getUrl())

    let ALLembed = new Discord.MessageEmbed()
    .setAuthor('» Relevé des données', interaction.guild.iconURL())
    .setColor(cl.invisible)
    .setDescription(`**__Messages__**\`\`\`diff\n${bool(stats[0])} Aujourd'hui » `+ stats[0] + `\n${bool(stats[1])} Hier » `+ stats[1] + `\n${bool(stats[2])} Il y a 3 jours » `+ stats[2]+ `\n${bool(stats[3])} La semaine dernière » `+ stats[3]+`\n${bool(dbGuild.gxp)} Total  `+ dbGuild.gxp +`\`\`\` **__Membres__**\`\`\`diff\n${bool(stats[4])} Aujourd'hui » `+ stats[4] + `\n${bool(stats[5])} Hier » `+ stats[5] + `\n${bool(stats[6])} Il y a 3 jours » `+ stats[6]+ `\n${bool(stats[7])} La semaine dernière » `+ stats[7] + `\`\`\``)
    interaction.reply('_ _')

  let msg = await interaction.channel.send({embeds:[MENUembed]})
await msg.react('🏠').then(()=> msg.react('🗂').then(()=> msg.react('✉️').then(()=> msg.react('👤').then(()=> msg.react('📊'))))) 


const filter = (reaction, user) => reaction.emoji.name == '🗂'  && user.id === interaction.user.id
await msg.awaitReactions(filter, { max: 1, time: 30000})
  .then(async collected => console.log('t'))
  .catch(console.error);

}

module.exports.help = COMMANDS.GUILD;

