const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletefruit')
        .setDescription("Deletes a fruit from database"),
    async execute(message, args, Fruits){
        if(!message.member.roles.cache.has('891540072661397544')) //Wizard role
            return message.reply(`You are not a wizard`);
        
        if(args[0] == undefined)
                return message.reply(`\`\`\`$deletefruit <:emoji_name:emoji_id>\`\`\``);
    
        const fruit = await Fruits.destroy({ where: { emojiID: args[0] } });
        if(!fruit)
            return message.reply('That fruit id no exist.');
        return message.reply(`Fruit ${args[0]} deleted.`);
    }
}