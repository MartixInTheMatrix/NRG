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

}