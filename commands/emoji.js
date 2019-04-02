module.exports = {
	name: 'emoji',
	description: 'Sends a emoji',
	guildOnly: true,
    args: true,
    usage: '<emoji1> [emoji2] [emoji3]...',
	async execute(message, args) {
		var emoji;
		var txt = '';
		for (let i=0; i<args.length; ++i){
			emoji = message.guild.emojis.find(x => x.name === args[i]);
			if(emoji != undefined){
				if(emoji.animated){
					txt += await `<a:${emoji.name}:${emoji.id}>`;
				}
				else{					
					txt += await `<:${emoji.name}:${emoji.id}>`;
				}
			}
		}
		message.channel.send(txt);
	},
};