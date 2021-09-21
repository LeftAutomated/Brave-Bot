const { Client, Intents, Collection } = require('discord.js')
const { token, prefix } = require('./config.json');
const fs = require('fs');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Brave Bot online.');
    client.user.setActivity("with humans", {type: "PLAYING"});
});

client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        client.commands.get('help').execute(message, args, commandFiles);
    }
    else if(command === 'fruit'){
        client.commands.get('fruit').execute(message, args, client);
    }
    else{
        message.channel.send("**Invalid command >:()**");
    }
});

client.login(token);