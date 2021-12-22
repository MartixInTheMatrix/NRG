const config = require('../../util/config');
const { deploySlashCommands } = require('../../startup')
module.exports = async (Client) => {
    const statuses = [`/help`, '@NRG pour le panel de réparation'];
	var i = 0;

    setInterval(() => {
        Client.user.setActivity(statuses[i], {type:"PLAYING"});
        i = ++i % statuses.length
    }, 30000)
    

	console.log(`BotLog : NRG / Connecté en tant que ${Client.user.tag}`);
    deploySlashCommands(Client)
    console.log('BotLog : NRG / Commandes slash correctement enregistrées !')

}
