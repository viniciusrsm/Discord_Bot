
module.exports = {
    name: 'sai',
    guildOnly: true,
    execute(message) {
        if (message.member.voice.channel) {
            message.member.voice.channel.leave();
    }
}}