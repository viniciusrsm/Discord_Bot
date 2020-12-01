const fs = require('fs')

module.exports = {
    name: 'cola',
    guildOnly: true,
    execute(message) {
        if (message.member.voice.channel) {
            message.member.voice.channel.join();
        }
    }
}