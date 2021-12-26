const { SlashCommandBuilder } = require('@discordjs/builders');

const COMMANDS = {
        HELP: {
            name: 'help',
            description: 'Donne des informations sur l\'utilisation du bot !',
            interaction: new SlashCommandBuilder()
            .setName('help')
            .setDescription('Donne des informations sur l\'utilisation du bot !'),
        },
        STATS: {
            name: 'stats',
            description: 'Renvoie les statistiques du serveur !',
            interaction: new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Renvoie les statistiques du serveur !')
            .addStringOption(option =>
                option.setName('guildid')
                .setDescription('Non obligatoire, si vous voulez les stats de ce serveur, passez la question')
                .setRequired(false)
            )
        
        },
        PING: {
            name: 'ping',
            description: 'Renvoie les informations réseau du bot !',
            interaction: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Renvoie les informations réseau du bot !'),
        },
        EVAL: {
            name: 'eval',
            description: 'Evalue votre serveur au programme partenaire discord',
            interaction: new SlashCommandBuilder()
            .setName('eval')
            .setDescription('Evalue votre serveur au programme partenaire discord'),
        },
        INVITES: {
            name: 'invites',
            description: 'Informations sur les invitations du serveur',
            interaction: new SlashCommandBuilder()
            .setName('invites')
            .setDescription('Informations sur les invitations du serveur'),
        },
        TOP: {
            name: 'top',
            description: 'Leaderboard des serveurs',
            interaction: new SlashCommandBuilder()
            .setName('top')
            .setDescription('Leaderboard des serveurs'),
        },
        NRG: {
            name: 'nrg',
            description: 'Donne des informations sur le bot',
            interaction: new SlashCommandBuilder()
            .setName('nrg')
            .setDescription('Donne des informations sur le bot'),
        },
        GUILD: {
            name: 'guild',
            description: 'Donne les statistiques globales du serveur',
            interaction: new SlashCommandBuilder()
            .setName('guild')
            .setDescription('Donne les statistiques globales du serveur'),
        },
        ANALYSE: {
            name: 'analyse',
            description: 'Effectue un test d\'activité',
            interaction: new SlashCommandBuilder()
            .setName('analyse')
            .setDescription('Effectue un test d\'activité')
            .addChannelOption(option =>
                option.setName('salon')
                .setDescription('Mentionnez le salon où vous voulez mettre le test d\'activité')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('temps')
                .setDescription('Entrez la durée du test (sous forme 3s, 2d, 1m)')
                .setRequired(true)
            )
            .addRoleOption(option =>
                option.setName('role')
                .setDescription('Entrez le role mentionné (non obligatoire)')
                .setRequired(false)
            )
            
        },
        ME: {
            name: 'me',
            description: 'Donne vos statistiques personnelles',
            interaction: new SlashCommandBuilder()
            .setName('me')
            .setDescription('Donne vos statistiques personnelles'),
        },
    
}
module.exports = {
    COMMANDS
}