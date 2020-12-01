const fs = require('fs')
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commandName = require(`./commands/${file}`);
    client.commands.set(commandName.name, commandName);
}

// INICIA
client.once('ready', () => {
	console.log('To pronto caralho');
});

// MENSAGENS
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    if (message.content.slice(prefix.length).trim().split(/ (.+)/)[1] !== undefined) {
        var champion = (message.content.slice(prefix.length).trim().split(/ (.+)/)[1]).trim().replace(/[' .#]/g,'')
        var championName = (message.content.slice(prefix.length).trim().split(/ (.+)/)[1]).trim().replace(/[' .#]/g,'')
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {   
        return message.reply('Não é possível executar esse comando em uma DM.');
    }

    if (command.args && !args.length) {
        let reply = `Digita o comando direito seu corno, ${message.author}!`;

        if (command.usage) {
        	reply += `\nO uso correto seria: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args, champion, championName);
    } catch (error) {
        console.error(error);
        message.reply(`Coé deu merda no comando, ${error}`);
    }

});


client.login('Nzc3NjQ4MDUzOTMwNjg4NTEy.X7GfMA.haih9lRc4S9SxHRlG0IohSJV9sc');