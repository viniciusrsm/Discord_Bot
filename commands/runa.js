const aids = require("child_process").execFileSync;

module.exports = {
    name: 'runa',
    args: true,
    usage: '[nome do campeão]',
    execute(message, args, champion) {
        var numRuna = aids('python', ['commands/python/runa.py', champion]);
        
        for (c = 0; numRuna > c; c++) {
            message.channel.send(`${message.author}, as runas e build do seu campeão são: \nOpção #${c+1}`, {files: [`./runa${c}.png`]});
        }
                  
    }
};