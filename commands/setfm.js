module.exports = {
	name: 'setfm',
	description: 'Shows most recent last.fm scrobbles',
	aliases: ['fmset', 'setlast', 'setlast.fm', 'setlastfm'],
	guildOnly: true,
	args: true,
	usage: '<last.fm username>',
	async execute(message, args) {
		await message.client.enmap_fm.defer;
		
		message.client.enmap_fm.set(message.author.id, args[0]);

		console.log(message.client.enmap_fm);
		//message.channel.send(message.client.util.inspect(message.client.enmap_fm));
		message.reply("Your last.fm account has been set");
	},
};