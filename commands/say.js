module.exports = {
	name: 'say',
	description: 'Says something.',
	guildOnly: true,
	async execute(message, args) {

		if(message.mentions.everyone) {			
			message.reply(`don't you dare @ everyone! Calling reinforcements <@217735332236492800>`);
			return;
		}

		if(message.mentions.roles.size != 0) {			
			message.reply(`don't you dare @ roles! Calling reinforcements <@217735332236492800>`);
			return;
		}

		if(message.mentions.users.size >= 4) {			
			message.reply(`don't you dare @ users! Calling reinforcements <@217735332236492800>`);
			return;
		}

		/*const msg = args.join(" ");	
		try {
			const clean = await message.client.custom.cleanABit(message.client, msg);
			await message.channel.send(`${clean}`);
			await message.delete();
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${await message.client.custom.clean(message.client, err)}\n\`\`\``);
		}*/

		const delmessage = await message.delete();
		const msg = args.join(" ");	
		console.log("Say by "+delmessage.author.username+'#'+delmessage.author.discriminator+" ("+delmessage.author.id+"): "+msg)
		try {
			const clean = await delmessage.client.custom.cleanABit(delmessage.client, msg);
			await delmessage.channel.send(`${clean}`);
		} catch (err) {
			delmessage.channel.send(`\`ERROR\` \`\`\`xl\n${await delmessage.client.custom.clean(delmessage.client, err)}\n\`\`\``);
		}
	},
};