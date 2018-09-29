module.exports = {
	name: 'setfm',
	description: 'Shows most recent last.fm scrobbles',
	aliases: ['setlast', 'setlast.fm', 'setlastfm'],
	guildOnly: true,
	args: true,
	usage: '<last.fm username>',
	async execute(message, args) {
		await message.client.enmap_fm.defer;

		const id = parseInt(message.author.id, 10);

		if(isNaN(id))
			return;

		const username = args[0];

		message.client.enmap_fm.set(+id, username);

		//console.log(message.client.enmap_fm);
		//message.channel.send(message.client.util.inspect(message.client.enmap_fm));
		message.reply("Your last.fm account has been set");
	},
};