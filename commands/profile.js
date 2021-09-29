const { stripIndents } = require('common-tags');
const Discord = require('discord.js');
const coin = require('../data/coins.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription("Shows profile"),
    execute(message, args){

        
        
        const embed = new Discord.MessageEmbed();
        var roles = "";
        message.member.roles.cache.forEach(x => {
            if(x != 885536440216338543)
                roles += "\n<@&" + x + ">";
        });
        
        embed.setAuthor("Profile");
        embed.setThumbnail(message.author.avatarURL({ dynamic:true }));
        embed.addField(
            'Member Information', stripIndents`**Display name |** ${message.member.displayName} 
            **Joined at |** ${Intl.DateTimeFormat('en-US').format(message.member.joinedAt)} 
            **Roles |** ${roles}
            **Points |** ${coin[message.author.id].coins} `, true);
        
        embed.addField(
            'User Information', stripIndents`**ID |** ${message.author.id}
            **Username |** ${message.author.username}
            **Tag |** ${message.member.user.tag}
            **Created at |** ${Intl.DateTimeFormat('en-US').format(message.member.user.createdAt)}`, true);
        
        embed.setFooter(message.guild.name, message.guild.iconURL());
        embed.setColor('36393F');

        message.channel.send({ embeds: [embed]});
    }
}