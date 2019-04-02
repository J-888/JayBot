module.exports = {
	name: 'ping',
	description: 'Ping!',
	guildOnly: true,
	async execute(message, args) {
		const msg = await message.channel.send("Ping? . . .");
		msg.edit(`Pong!\`\`\`cs\nBot Latency: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI Latency: ${Math.round(message.client.ping)}ms\`\`\``);
	},
};