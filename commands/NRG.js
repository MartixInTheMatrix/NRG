const Discord = require('discord.js')
const fs = require('fs')
const { COMMANDS } = require("../util/commands");
const os = require('os')
const QuickChart = require('quickchart-js');
const em = require('../util/emojis')
module.exports.execute = async (Client, interaction) => {
    const serveursBar = new QuickChart()
    serveursBar.setConfig(
        {
            type: 'progressBar',
            data: {
              datasets: [{
                data: [Client.guilds.cache.size],
                "backgroundColor": [
                    '#5865F2',
                    "rgba(255, 255, 255, 0.1)"
                  ],

              }]
            },
            plugins: {
                backgroundImageUrl: 'https://cdn.discordapp.com/attachments/816650927254536214/816756917513748490/image0.png',
              },
              options:{
                  rectangle:{
                    height: 30,
                    color:"rgba(255, 255, 255, 0.1)",
                  }
              }
          }
    )

    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

    usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
    totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);
    guilds = [];
    Client.guilds.cache.forEach(g => {
        guilds.push(g.name)
    });
    let embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor(' » NRG#7617', Client.user.displayAvatarURL())
    .setDescription(`**Voici les informations du bot :**
            
    ⚙️  » **Informations Système**

    > 💽 » \`Os\`・ ${os.platform()}
    > 💿 » \`RAM Totale\`・ ${totalMemory} GB
    > 🗑️ » \`RAM Utilisée\`・ ${usedMemory} GB *(${getpercentage})*

    🤖  » **Informations sur le bot**

    > ${em.owner} » \`Créateur\`・ <@626431238491734026>
    > ${em.world} » \`Serveurs\`・ ${Client.guilds.cache.size}
    > ${em.members} » \`Utilisateurs\`・ ${Client.users.cache.size}
    > ${em.hastag} » \`Salons\`・ ${Client.channels.cache.size}

    ${em.link}  » **Liens**

    > ${em.link} » \`Invitation\`・ [Clique ici](https://discord.com/api/oauth2/authorize?client_id=814805186181857290&permissions=8&scope=bot)
    > ${em.help} » \`Serveur support:\`・ [Clique pour rejoindre](https://discord.gg/PNbsQWQpAA)
     

    **» ${Client.guilds.cache.size} / 100 serveurs**`)
    .setImage(serveursBar.getUrl())
    interaction.reply({embeds:[embed]})
}

module.exports.help = COMMANDS.NRG;
