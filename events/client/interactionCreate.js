const Discord = require('discord.js');
const { db } = require('../../models/guild');

module.exports = async (Client, interaction) => {
    if(interaction.isCommand()){
	
	let date = new Date()

	const command = Client.commands.get(interaction.commandName);
	const dbGuild = await Client.getGuild(interaction.guild)
	const dbUser = await Client.getUser(interaction.guild.members.cache.get(interaction.user.id))
	const today = Client.convertDate(date)

	if (!command) return;

	try {
		await command.execute(Client, interaction, dbGuild, today, dbUser);
		console.log('BotLog : NRG / ' + interaction.user.tag + ' a éxectué la commande ' + interaction.commandName)

	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'Il y a eu une erreur !' });
	}
}else if (interaction.isSelectMenu()){
	let dbGuild = await Client.getGuild(interaction.guild)
	if(interaction.customId === 'config'){
		switch(interaction.values[0]){
			case('captcha'):
			if(dbGuild.captcha){
				let msg
				interaction.reply('Le module captcha est déjà activé sur votre serveur, appuyez sur 🗑️ pour enlever le module')
				.then(async ()=>{
					msg = await interaction.channel.send('_ _')
					await msg.react('🗑️')
					const filter = (reaction, user) => {
						return (reaction.emoji.name == '🗑️' && user.id === interaction.user.id);
					};
					msg.awaitReactions({filter: filter, max: 1, time: 30000 }).then(async collected => {
						await Client.updateGuild(interaction.guild, {captcha:false})
						msg.channel.bulkDelete(2)
						let embed = new Discord.MessageEmbed()
					.setColor('#2f3136')
					.setTitle('Système desactivé !')
					.setDescription('Le module de captcha a été desactivé avec succès !')
					interaction.channel.send({embeds:[embed]})
					})
				})
				
			}else{
				await Client.updateGuild(interaction.guild, {captcha:true})
				let embed = new Discord.MessageEmbed()
				.setColor('#2f3136')
				.setTitle('Système activé !')
				.setDescription('Le module de captcha a été activé avec succès, à présent, quand un membre rejoindra le serveur, il aura une verification a passer')
				interaction.reply({embeds:[embed]})
			}
				
			break;
			case('modmail'):
			if(!dbGuild.modmail || dbGuild.modmailID == 'false'){
				
				let ch = interaction.channel.id
				let uz = interaction.user.id
				interaction.reply('Veuillez envoyer l\'id du salon des tickets')
				console.log(ch)
				const msg_filter = (m) => m.author.id === uz;
				Client.channels.cache.get(ch).awaitMessages({ filter: msg_filter, max: 1 })
				  .then(async(collected) => {
				console.log(collected.first().content.toLowerCase())
					let channel = Client.channels.cache.get(collected.first().content.toLowerCase())
					await Client.updateGuild(interaction.guild, {modmailID: collected.first().content.toLowerCase()})
					Client.channels.cache.get(ch).send('Veuillez ensuite envoyer l\'id du role staff')
					Client.channels.cache.get(ch).awaitMessages({ filter: msg_filter, max: 1 })
					.then(async collected => {
					let role = collected.first().content.toLowerCase()
					Client.channels.cache.get(ch).send('Enfin, envoyez l\'id du role membre')

					Client.channels.cache.get(ch).awaitMessages({ filter: msg_filter, max: 1 })
					.then(async(collected) => {
					let membre = collected.first().content.toLowerCase()
					Client.channels.cache.get(ch).bulkDelete(6)
					let embed = new Discord.MessageEmbed()
					.setColor('#2f3136')
					.setTitle('Système activé !')
					.setDescription('Le module de modmail a été activé avec succès, la catégorie MODMAIL a été crée, vous pouvez changer le nom, la déplacer, mais ne la supprimez surtout pas, sinon le système ne fonctionnera plus')
					Client.channels.cache.get(ch).send({embeds:[embed]})
					Client.guilds.cache.get(dbGuild.guildID).channels.create('MODMAIL', {
						type: 'GUILD_CATEGORY',
						permissionOverwrites: [
						   {
							 id: role,
							 allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES],
						  },
						  {
							id: membre,
							deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL, Discord.Permissions.FLAGS.SEND_MESSAGES],
						 },
						],
					  })
					  let ticketEmbed = new Discord.MessageEmbed()
					  .setColor('#2f3136')
					  .setAuthor('Ticket', Client.guilds.cache.get(dbGuild.guildID).iconURL())
					  .setDescription('Réagissez avec 🎟 pour ouvrir un ticket support')
					let msg = await channel.send({embeds:[ticketEmbed]})
					await msg.react('🎟')
					})
				})
				})
			}else{
				let msg
				interaction.reply('Le module modmail est déjà activé sur votre serveur, appuyez sur 🗑️ pour enlever le module')
				.then(async ()=>{
					msg = await interaction.channel.send('_ _')
					await msg.react('🗑️')
					const filter = (reaction, user) => {
						return (reaction.emoji.name == '🗑️' && user.id === interaction.user.id);
					};
					msg.awaitReactions({filter: filter, max: 1, time: 30000 }).then(async collected => {
						await Client.updateGuild(interaction.guild, {modmailID:false})
						msg.channel.bulkDelete(2)
						let embed = new Discord.MessageEmbed()
					.setColor('#2f3136')
					.setTitle('Système desactivé !')
					.setDescription('Le module de modmail a été desactivé avec succès !')
					interaction.channel.send({embeds:[embed]})
					})
				})
			
			}
			break;
			case('bvn'):
			interaction.reply('pas encore dispo')
			break;
		}

	}

}
}