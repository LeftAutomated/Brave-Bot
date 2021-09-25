//Imports
const Discord, { MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Lists avaiable commands"),
    execute(message, args, commandFiles){
        const embed = new Discord.MessageEmbed();
        embed.setTitle("Command List");
        embed.setDescription("prefix -> $");

        commandFiles.sort();
        
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if(args[0]){
                if(command.data.name == args[0]){
                    embed.addFields(
                        { name: `$ ${command.data.name}`, value: `desc: ${command.data.description}`}
                    );
                    break;
                }
            }
            else{
                embed.addFields(
                    { name: `$ ${command.data.name}`, value: `desc: ${command.data.description}`}
                );
            }      
        }

        embed.setColor('36393F');

        message.channel.send({ embeds: [embed] });
    }
}