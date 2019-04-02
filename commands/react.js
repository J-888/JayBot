module.exports = {
	name: 'react',
	description: 'Reacts with a custom emoji',
	guildOnly: true,
    args: true,
    usage: '<emoji1> [emoji2] [emoji3]...',
	async execute(message, args) {
    
		var emoji;
		for (let i=0; i<args.length; ++i){
			emoji = message.guild.emojis.find(x => x.name === args[i]);
			if(emoji != undefined){
				await message.react(emoji);
			}
      else{
        await message.react(args[i]);
      }
		}
	},
};