module.exports = {
	name: 'rate',
	description: 'Reacts with a thubs up and down so everyone can rate something',
	guildOnly: true,
	args: true,
	usage: '<mode> <message number> [before message]\nmodes: `url, media, all`',
	async execute(message, args) {
		if(message.author.id === message.client.config.botownerID) {
			var current_filter;

			var msgNumber = parseInt(args[1], 10);
			if(isNaN(msgNumber)){
				message.reply('Invalid number');
				return;
			}
			else if(msgNumber > 100){
				message.reply('the message number was capped to 100');				
			}

			if(args[0] === 'url')
				current_filter = msg => (msglist.reactions == undefined || msglist.reactions.size < 2 || ! msglist.reactions.has('👍') || ! msglist.reactions.has('👎')) && (msg.content.includes('https://') || msg.content.includes('http://'));
			else if(args[0] === 'media')
				current_filter = msg => (msglist.reactions == undefined || msglist.reactions.size < 2 || ! msglist.reactions.has('👍') || ! msglist.reactions.has('👎')) && (msg.content.includes('https://') || msg.content.includes('http://') || msg.attachments.size != 0);
			else if(args[0] === 'all')
				current_filter = msg => (msglist.reactions == undefined || msglist.reactions.size < 2 || ! msglist.reactions.has('👍') || ! msglist.reactions.has('👎'));	
			else{
				message.reply('Invalid mode');
				return;
			}

			var before_msg = args.length >= 3 ? args[2] : message.id;

			var msglist = await message.channel.fetchMessages({ limit: msgNumber, before: before_msg });

			msglist = msglist.filter(current_filter);
			message.reply('reacting to '+ msglist.size +' messages, this might take a while...');

			await msglist.map(async msg => msg.react('👍').then(() => msg.react('👎')));

		}
		else{
			message.channel.send(`You are not the bot owner ${message.author}!`);
		}
	},
};