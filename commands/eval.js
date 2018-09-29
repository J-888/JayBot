module.exports = {
	name: 'eval',
	description: 'Evaluates arbitrary javascript.',
	guildOnly: true,
	async execute(message, args) {
		if(message.author.id === message.client.config.botownerID) {
			const code = args.join(" ");
			try {
				const evaled = eval(code);
				const clean = await message.client.custom.clean(message.client, evaled);
				message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
			} catch (err) {
				message.channel.send(`\`ERROR\` \`\`\`xl\n${await message.client.custom.clean(message.client, err)}\n\`\`\``);
			}
		}
		else{
			message.channel.send(`You are not the bot owner ${message.author}!`);
		}
	},
};