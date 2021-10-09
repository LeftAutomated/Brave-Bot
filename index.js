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

//Database connection
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

//Defining database model
const Fruits = sequelize.define('fruits', {
    emojiID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});

//When bot is on
client.on('ready', () => {
    
    Fruits.sync();

    //Add server emojis
    client.emojis.cache.map(async (e) => {
        const temp = await Fruits.findOne({where: { emojiID: `${e}` }})
        if(!temp)
            await Fruits.create({ 
                emojiID: `${e}`,
            })
    });
    
    client.user.setActivity("with people", {type: "PLAYING"});

    const now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');
    client.channels.cache.get("889981160246099968").send(`CoCo-Bot is online at ${now}`);

    //client.channels.cache.get("889916540047204422").send(`testing`);  // for trolling
    
    console.log('CoCo-Bot is online.');
});

//Message Handling
client.on('messageCreate', message =>{
    if(message.channel.id === '896422206299594752')               //#art-drop-no-text
        if(!message.member.roles.cache.has('896277755929456730')) //Admin role
            if(message.attachments.size == 0){
                message.delete()
                .catch(console.error);
                return;
            }

    if(message.channel.id === '896499896306253824')         //#bot-spam
        message.channel.send('Code Coogs');

    if(message.channel.id === '893357277002747934')         //#bot-suggestions
        message.react('🤔');
    else if(message.channel.id === '885536440719663116')    //#welcome
        message.react('👋');
    else if(message.channel.id === '893374537884893194'){   //#play-music
        message.react('<a:catjam:893360258091712522>');
        message.react('<a:pogdance:893516135079751721>');
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help')
        client.commands.get('help').execute(message, args, commandFiles);
    else if(command === 'fruit')
        client.commands.get('fruit').execute(message, args, Fruits);
    else if(command === 'addfruit')
        client.commands.get('addfruit').execute(message, args, Fruits);
    else if(command === 'deletefruit')
        client.commands.get('deletefruit').execute(message, args, Fruits);
    else if(command === 'stonks')
        client.commands.get('stonks').execute(message, args, client);
    else if(command === 'profile')
        client.commands.get('profile').execute(message);
    else if(command === 'duel')
        client.commands.get('duel').execute(message, args);
    else if(command === 'lb')
        client.commands.get('lb').execute(message, args, client);
    else if(command === 'wizard')
        client.commands.get('wizard').execute(message);
    else
        message.channel.send("**Invalid command >:()**");
});

//Host server
keepAlive();

//Login with token
client.login(token);