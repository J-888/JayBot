module.exports = {
	name: 'reactto',
	description: 'Reacts with a custom emoji, deleting the command message',
	guildOnly: true,
    args: true,
    usage: '<id> <emoji1> [emoji2] [emoji3]...',
	async execute(message, args) {
    var tomessage = await message.channel.fetchMessage(args[0]);
		var emoji;
		for (let i=1; i<args.length; ++i){
			emoji = message.guild.emojis.find(x => x.name === args[i]);
			if(emoji != undefined){
				await tomessage.react(emoji);
			}
      else{
        await tomessage.react(args[i]);
      }
		}
    message.delete();
  },
};