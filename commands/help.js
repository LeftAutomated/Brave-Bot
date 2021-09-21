const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "Lists avaiable commands",
    execute(message, args, commandFiles){
        const embed = new Discord.MessageEmbed();

        embed.setTitle("Command List");
        embed.setDescription("prefix -> $");
        
        commandFiles.sort();
        
        for (const file of commandFiles) {
            const command = require(`${file}`);
            if(args[0]){
                if(command.name == args[0]){
                    embed.addFields(
                        { name: `$ ${command.name}`, value: `desc: ${command.description}`}
                    );
                    break;
                }
            }
            else{
                embed.addFields(
                    { name: `$ ${command.name}`, value: `desc: ${command.description}`}
                    );
            }      
        }

        embed.setColor('36393F');

        message.channel.send({ embeds: [embed] });
    }
}