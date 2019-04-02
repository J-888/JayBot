module.exports = {
	name: 'reload',
	description: 'Reloads a command, including any modifications.',
	guildOnly: true,
	args: true,
	usage: '<command>',
	async execute(message, args) {
		if(message.author.id === message.client.config.botownerID) {
			let response;

			response = await message.client.custom.unloadCommand(args[0]);
			if (response) return message.reply(`Error Unloading: ${response}`);

			response = message.client.custom.loadCommand(args[0]);
			if (response) return message.reply(`Error Loading: ${response}`);

			const str = `The command \`${args[0]}\` has been reloaded`;
			const hline = '─'.repeat(str.length)
			message.reply(str);
			console.log(hline + '\n' + str + '\n' + hline);
		}
		else{
			message.channel.send(`You are not the bot owner ${message.author}!`);
		}
	},
};