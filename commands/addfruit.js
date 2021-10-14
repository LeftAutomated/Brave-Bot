const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addfruit')
        .setDescription("Adds a fruit to database"),
    async execute(message, args, Fruits){
        if(!message.member.roles.cache.has('891540072661397544')) //Wizard role
            return message.reply(`You are not a wizard`);

        try{
            if(args[0] == undefined)
                return message.reply(`\`\`\`$addfruit <:emoji_name:emoji_id>\`\`\``);
            var fruitId = args[0];
            if(fruitId.search(":") == -1)
                return message.reply(`\`\`\`Format <:emoji_name:emoji_id>\`\`\`\n\`\`\`Use .\\:emoji_name:\`\`\``);
            var fruitName = fruitId.substring(fruitId.search(":")+1);
            if(fruitName.search(":") == -1)
                return message.reply(`\`\`\`Format <:emoji_name:emoji_id>\`\`\`\n\`\`\`Use .\\:emoji_name:\`\`\``);
            fruitName = fruitName.substring(0, fruitName.search(":"));
            await Fruits.create({
		        emojiID: fruitId,
	        });
	        return message.reply(`Fruit ${fruitId} added.`);
        }
        catch(error){
            if (error.name === 'SequelizeUniqueConstraintError') 
		        return message.reply('That fruit already exists.');
	        return message.reply('You broke the command noob.');
        }
    }
}