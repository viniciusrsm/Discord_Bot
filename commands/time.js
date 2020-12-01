const express = require('express')
const {spawn} = require('child_process');
const app = express()


module.exports = {
    name: 'time',
    execute(message) {
        var champs;
        const python = spawn('python', ['commands/python/time.py']);
        python.stdout.on('data', function (data) {
            champs = data.toString();
            message.channel.send(champs)
        })   
        
    }   
}