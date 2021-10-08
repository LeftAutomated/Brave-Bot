const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { stripIndents } = require('common-tags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription("Shows profile"),
    execute(message){
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
            **Roles |** ${roles}`, true);
        
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