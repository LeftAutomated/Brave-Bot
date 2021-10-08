//Imports
const { Client, Intents, Collection } = require('discord.js')
const { token, prefix } = require('./config.json');
const date = require('date-and-time');
const coin = require('./data/coins.json');
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
    //client.channels.cache.get("893402448474038292").send("the works of the wizard");
    client.user.setActivity("with people", {type: "PLAYING"});
});

//Determine whether user's message meets one of the commands
client.on('messageCreate', message =>{
    if(message.channel.id === '893357277002747934')
        message.react('🤔');
    else if(message.channel.id === '885536440719663116')
        message.react('👋');
    else if(message.channel.id === '893374537884893194'){
        message.react('<a:catjam:893360258091712522>');
        message.react('<a:pogdance:893516135079751721>');
    }
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const list = client.guilds.cache.get("885536440216338543"); 
    list.members.cache.each(member => {
        if(!coin[message.author.id]){
            coin[message.author.id] = {
                name: message.author.id,
                coins: 0
            }
            fs.writeFileSync(`${coin}`, JSON.stringify(coin), err =>{
                if(err){
                    console.log(err);
                }
            });
        }
    });

    if(command === 'help'){
        client.commands.get('help').execute(message, args, commandFiles);
    }
    else if(command === 'fruit'){
        client.commands.get('fruit').execute(message, args, client);
    }
    else if(command === 'stonks'){
        client.commands.get('stonks').execute(message, args, client);
    }
    else if(command === 'profile'){
        client.commands.get('profile').execute(message, args);
    }
    else if(command === 'duel'){
        client.commands.get('duel').execute(message, args, list);
    }
    else if(command === 'lb'){
        client.commands.get('lb').execute(message, args, client);
    }
    else if(command === 'wizard'){
        client.commands.get('wizard').execute(message, args, client);
    }
    else{
        message.channel.send("**Invalid command >:()**");
    }
    
});

//Login with token
client.login(token);