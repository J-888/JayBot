module.exports = {
	name: 'ping',
	description: 'Ping!',
	guildOnly: true,
	async execute(message, args) {
		const msg = await message.channel.send("Ping? . . .");
		msg.edit(`Pong!\nBot Latency is ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI Latency is ${Math.round(message.client.ping)}ms`);
	},
};