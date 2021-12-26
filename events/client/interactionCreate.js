
module.exports = async (Client, interaction) => {
    if(!interaction.isCommand())return;

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
}