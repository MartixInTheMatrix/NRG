const Discord = require('discord.js')
const os = require('os')
const { COMMANDS } = require("../util/commands");


module.exports.execute = async (Client, interaction) => {

    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    var system = os.platform()
    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

  usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
  totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);

            let embed = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({format: 'png', dynamic: 'true'}))
            .setDescription('**Latence CLIENT** '+ Math.round(Client.ws.ping)+'ms'+'\n\n **En ligne depuis** '+msToTime(Client.uptime)+  '\n\n**Mémoire utilisée :** ' + getpercentage + '\n\n**Système d\'exploitation :** ' + system) 
    await interaction.reply({embeds:[embed]})
    function msToTime(ms){
      days = Math.floor(ms / 86400000); // 24*60*60*1000
      daysms = ms % 86400000; // 24*60*60*1000
      hours = Math.floor(daysms / 3600000); // 60*60*1000
      hoursms = ms % 3600000; // 60*60*1000
      minutes = Math.floor(hoursms / 60000); // 60*1000
      minutesms = ms % 60000; // 60*1000
      sec = Math.floor(minutesms / 1000);
    
      let str = "";
      if (days) str = str + days + "d";
      if (hours) str = str + hours + "h";
      if (minutes) str = str + minutes + "m";
      if (sec) str = str + sec + "s";
    
      return str;
    }
}

module.exports.help = COMMANDS.PING