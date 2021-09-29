const { SlashCommandBuilder } = require('@discordjs/builders');
const coin = require('../data/coins.json');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duel')
        .setDescription("Duel someone else"),
    execute(message, args, list){
        
        coin[message.author.id] = {
            name: message.member.displayName,
            coins: parseFloat(coin[message.author.id].coins) + 1
            }
            fs.writeFileSync(`${coin}`, JSON.stringify(coin), err =>{
                if(err){
                    console.log(err);
                }
        });

        var members = [];
        var memberId = "";
        list.members.cache.each(member => {
            if(args == member.user.username || args == member.user.nickname || args == member.user.displayName)
                memberId = member.user.id;
            members.push("<@" + member.user.id + ">");
        });
        const ranIndex = Math.trunc(Math.random() * members.length);

        if(memberId == "")
            message.channel.send(`Duel with me ${members[ranIndex]} + 1 point`);
        else
            message.channel.send(`Duel with me <@${memberId}> + 1 point`);
    }
}