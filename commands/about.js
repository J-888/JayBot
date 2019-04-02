module.exports = {
	name: 'about',
	description: 'Info about this bot',
	guildOnly: true,
	async execute(message, args) {
		const string1 = `${message.client.user} is a one man only bot made with Discord.js by `;
		const string2 = `.\nMake sure to submit to him any feedback (suggestions, issues, bugs, etc.).`;
		
		const msg = await message.channel.send(string1 + 'J-888' + string2);
		msg.edit(string1 + `<@217735332236492800>` + string2);
	},
};