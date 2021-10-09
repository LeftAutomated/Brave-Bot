//Imports
const { Client, Intents, Collection } = require('discord.js')
const date = require('date-and-time');
const fs = require('fs');
const keepAlive = require('./server');
const Sequelize = require('sequelize');

//Configuration
require("dotenv").config();

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

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

//Database connection WIP
/* const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
}); */

//Defining database model WIP
/* const Emojis = sequelize.define('emojis', {
	name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
});
 */

//Set bot's activity
client.on('ready', () => {
    
    /* Emojis.sync(); */

    client.user.setActivity("with people", {type: "PLAYING"});

    const now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');
    client.channels.cache.get("889981160246099968").send(`Brave-Bot is online at ${now}`);

    //client.channels.cache.get("893402448474038292").send("the works of the wizard");  // for trolling
    
    console.log('Brave-Bot is online.');
});

//Client Message Handling 
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

    if(command === 'help'){
        client.commands.get('help').execute(message, args, commandFiles);
    }
    else if(command === 'fruit'){
        client.commands.get('fruit').execute(message, args);
    }
    else if(command === 'stonks'){
        client.commands.get('stonks').execute(message, args, client);
    }
    else if(command === 'profile'){
        client.commands.get('profile').execute(message);
    }
    else if(command === 'duel'){
        client.commands.get('duel').execute(message, args);
    }
    else if(command === 'lb'){
        client.commands.get('lb').execute(message, args, client);
    }
    else if(command === 'wizard'){
        client.commands.get('wizard').execute(message);
    }
    else{
        message.channel.send("**Invalid command >:()**");
    }
    
});

//Client Interaction Handling WIP
/* client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) 
        return;

    const command = client.commands.get(interaction.commandName.toLowerCase());

    try{
        command.execute(interaction);
    }
    catch(error){
        console.error(error);
        interaction.followUp({
            content: 'Stupid Error',
        });
    }
}); */

//Host server
keepAlive();

//Login with token
client.login(token);