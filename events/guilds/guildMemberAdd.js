const discord = require('discord.js')

module.exports = async (Client, member) => {
    let date = new Date()
    let d = Client.convertDate(date)

    if(!await Client.getGuild(member.guild)){
        return await Client.createGuild(member.guild)
    }

    let arr = await Client.getGuild(member.guild)
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
        arr.stats[i][1].gtm ++;
    }
    await Client.updateGuild(member.guild, {stats:arr.stats})

    function convertDate(inputFormat) {

        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
}
