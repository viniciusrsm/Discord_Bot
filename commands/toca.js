module.exports = {
    name: 'toca',
    guildOnly: 'true',
    execute(message) {
        async function entrar() {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play('ajr.mp3');
            
                connection.
            
                dispatcher.on('começo', () => {
                    console.log('tocando')
                });
            
                dispatcher.on('final', () => {
                    console.log('terminou');
                });
            
                dispatcher.on('error', console.error);
            }
        }

    entrar()

}
}