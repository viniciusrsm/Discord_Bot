const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    aliases: ['comandos'],
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push(`Dale a lista dos comandos:\n`);
            data.push(`\`${commands.map(command => command.name).join(' | ')}\``);
            data.push(`\nVocê pode mandar \`${prefix}help [comando]\` para acessar as informações de um comando específico!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
		            message.reply('Uma DM foi enviada com todos os comandos');
                })
                .catch(error => {
                    console.error(`Não foi possível enviar a DM de ajuda para ${message.author.tag}.\n`, error);
                    message.reply('Parece que não foi possível enviar a DM para você, você tem suas DMs ativadas');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Retorne um comando válido')
        }
        data.push(`| Nome: "${command.name}"`);

        if (command.aliases) data.push(`| Apelidos: "${command.aliases.join(', ')}"`);
        if (command.description) data.push(`| Descrição: "${command.description}"`);
        if (command.usage) data.push(`| Utilização:  "${prefix}${command.name} ${command.usage}"`);

        message.channel.send(data, { split: true });
    },
};