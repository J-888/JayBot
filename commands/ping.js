module.exports = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5,
    guildOnly: true,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};