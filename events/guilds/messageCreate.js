const discord = require('discord.js')

module.exports = async (Client, message) => {

    let date = new Date()
    let d = Client.convertDate(date)
    if(!await Client.getGuild(message.guild)){
        return await Client.createGuild(message.guild)
    }
    let arr = await Client.getGuild(message.guild)
    let bool = false
    arr.stats.forEach((s)=>{
        if(s[0] === d){
            return bool = true
        }
    })
    if(!bool){
        arr.stats.push([d, {gtxp:1, gtm:1}])

    }else{
        let i;
        let n = 0;
        arr.stats.forEach((s)=>{
            if(s[0] === d){
                i = n
            }
            n++
        })
        arr.stats[i][1].gtxp++;
    }
    await Client.updateGuild(message.guild, {gxp:arr.gxp + 1, stats:arr.stats})

    
}
