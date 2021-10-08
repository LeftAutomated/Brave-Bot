const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duel')
        .setDescription("Duel someone else"),
    execute(message, args, list){

        var members = [];
        var memberId = "testing";
        const ranIndex = Math.trunc(Math.random() * members.length);

        if(memberId == "")
            message.channel.send(`Duel with me ${members[ranIndex]}`);
        else if(memberId == "testing")
            message.channel.send(`Duel with me, nobody`);
        else
            message.channel.send(`Duel with me <@${memberId}>`);
    }
}