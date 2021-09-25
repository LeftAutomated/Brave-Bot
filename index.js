//Imports
const { Client, Intents, Collection } = require('discord.js')
const { token, prefix } = require('./config.json');
const date = require('date-and-time');
const fs = require('fs');


//Defining bot
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

//Make collection of commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

//Set bot's activity
client.on('ready', () => {
    console.log('Brave-Bot is online.');
    const now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');
    client.channels.cache.get("889981160246099968").send(`Brave-Bot is online at ${now}`);
    client.user.setActivity("with humans", {type: "PLAYING"});
});

//Determine whether user's message meets one of the commands
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
    else if(command === 'stonks'){
        client.commands.get('stonks').execute(message, args, client);
    }
    else{
        message.channel.send("**Invalid command >:()**");
    }
});

//Login with token
client.login(token);