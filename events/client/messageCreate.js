const { Message, MessageEmbed } = require("discord.js")

module.exports = async (Client, message) => {
    if(message.mentions.members.first() == Client.user.id){
        let embed = new MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('Panel de réparation', Client.user.displayAvatarURL())
        .setDescription('**Si vos commandes slash ne s\'affichent pas**, veuillez kick et réinviter le bot au [lien suivant](https://discord.com/api/oauth2/authorize?client_id=814805186181857290&permissions=8&scope=bot%20applications.commands) \n> _Si le problème persiste après la manipulation effectuée, veuillez contacter **Martix#2021**._')
        message.channel.send({embeds:[embed]})
    }

}
