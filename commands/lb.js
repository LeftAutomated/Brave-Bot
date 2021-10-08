const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lb')
        .setDescription("Displays leaderboard"),
    execute(message){
        const embed = new Discord.MessageEmbed();
        embed.setTitle("Leaderboard");
        
        var ranks = "1";
        var users = "Beta Tester";
        var points = "999999999999999";

        embed.addField(
            'Rank', ranks, true);

        embed.addField(
            'User', users, true);

        embed.addField(
            'Points', points, true);

        embed.setColor('36393F');
        message.channel.send({ embeds: [embed]});
    }
}
