const mongoose = require("mongoose");
const guildSchema  = require("../models/guild");
const discord = require('discord.js')

module.exports = Client => {
    Client.createGuild = async guild => {
    let date = new Date()
    let d = Client.convertDate(date)

    const guildCreated = new guildSchema({
        guildID:`${guild.id}`,
        gxp: 0,
        stats:[[d, {gtxp:0, gtm: 0}]]
    });
        guildCreated.save().then(g => console.log(`BotLog : NRG / Nouveau serveur -> ${guild.name}`));
    };

    Client.deleteGuild = async guild => {
        guildSchema.findOneAndDelete({ guildID : guild.id }).then(console.log(`BotLog : NRG / Serveur supprimé -> ${guild.name}`));
    };
    
    Client.getGuild = async guild => {
        const data = await guildSchema.findOne({ guildID: guild.id });
        if (data) return data;
        else return false;
    };
    
    Client.updateGuild = async (guild, settings) => {
        let data = await Client.getGuild(guild);
        if(typeof data !== "object") data = {};
        for(const key in settings) {
            if(data[key] !== settings[key]) data[key] = settings[key];
        };
        return data.updateOne(settings);
    };

    Client.convertDate = inputFormat => {

        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    Client.all = async () => {
        const filter = {};
        const all = await guildSchema.find(filter);
        if (all) return all;
        else return false;
    }

    Client.releve = dbGuild => {
        
    let Mauj = 'rien';
    let Mhier = 'rien';
    let Mj3 = 'rien';
    let Msemaine = 'rien';

    let Uauj = 'rien';
    let Uhier = 'rien';
    let Uj3 = 'rien';
    let Usemaine = 'rien';
      if(!dbGuild.stats[dbGuild.stats.length - 1]){
        Mauj = 0
        Uauj = 0
      }
      if(!dbGuild.stats[dbGuild.stats.length - 2]){
        Mhier = 0
        Uhier = 0
      }
      if(!dbGuild.stats[dbGuild.stats.length - 4]){
        Mj3 = 0
        Uj3 = 0
    }
    if(!dbGuild.stats[dbGuild.stats.length - 8]){
        Msemaine = 0
        Usemaine = 0
    }

    if(Mauj == 'rien'){
        Mauj = dbGuild.stats[dbGuild.stats.length - 1][1].gtxp
    }
    if(Mhier == 'rien'){
        Mhier = dbGuild.stats[dbGuild.stats.length - 2][1].gtxp
    }
    if(Mj3 == 'rien'){
        Mj3 = dbGuild.stats[dbGuild.stats.length - 4][1].gtxp
    }
    if(Msemaine == 'rien'){
        Msemaine = dbGuild.stats[dbGuild.stats.length - 8][1].gtxp
    }
    if(Uauj == 'rien'){
        Uauj = dbGuild.stats[dbGuild.stats.length - 1][1].gtm
    }
    if(Uhier == 'rien'){
        Uhier = dbGuild.stats[dbGuild.stats.length - 2][1].gtm
    }
    if(Uj3 == 'rien'){
        Uj3 = dbGuild.stats[dbGuild.stats.length - 4][1].gtm
    }
    if(Usemaine == 'rien'){
        Usemaine = dbGuild.stats[dbGuild.stats.length - 8][1].gtm
    }

    return [Mauj, Mhier, Mj3, Msemaine, Uauj, Uhier, Uj3, Usemaine]
    }

}