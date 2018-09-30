const snekfetch = require('snekfetch');

module.exports = {
	name: 'chart',
	description: "Shows user's last.fm charts",
	//aliases: ['last', 'last.fm', 'lastfm'],
    guildOnly: true,
    args: false,
    usage: '[username] [size] [type]\nSizes: `3(default), 4, 5, 2`\nTypes: `7d(default), 1m, 3m, 6m, 12m, overall`',
	async execute(message, args) {

		var sizes = ['3', '4', '5', '2'];
		var types = ["7d", "1m", "3m", "6m", "12m", "overall"];

		var size = '3';
		var type = '7d';

		if(args.length == 0) {	//none
			await message.client.enmap_fm.defer;
			username = message.client.enmap_fm.get(message.author.id);
			//username = message.client.enmap_fm.get("errorusername");
		}
		else if(args.length == 1) {
			if(sizes.includes(args[0])) {	//[size]
				size = args[0];
				await message.client.enmap_fm.defer;
				username = message.client.enmap_fm.get(message.author.id);
			}
			else{
				if(types.includes(args[0])){	//[type]
					type = args[0];
					await message.client.enmap_fm.defer;
					username = message.client.enmap_fm.get(message.author.id);
					//username = message.client.enmap_fm.get("errorusername");
				}
				else {	//[username]
					username = args[0];
				}
			}
		}
		else if(args.length == 2) {
			if(sizes.includes(args[0])) {	//[size] [type]
				size = args[0];
				type = args[1];
				await message.client.enmap_fm.defer;
				username = message.client.enmap_fm.get(message.author.id);
			}
			else{
				if(sizes.includes(args[1])){	//[username] [size]
					username = args[0]
					size = args[1];
				}
				else {	//[username] [type]
					username = args[0]
					type = args[1];
				}
			}
		}
		else if(args.length == 3) {	//[username] [size] [type]
			username = args[0];
			size = args[1];
			type = args[2];
		}
		else {
			message.reply("you submited invalid parameters");
			return;
		}


		if(username === undefined){
			message.reply("set your last.fm username first with `*setfm <username>`");
			return;
		}

		switch(size) {
			case '3':
			size = '3x3';
			break;
			case '4':
			size = '4x4';
			break;
			case '5':
			size = '5x5';
			break;
			case '5':
			size = '2x6';
			break;
			default:
			message.reply("unknown size parameter");
			return;
		}

		switch(type) {
			case '7d':
			type = '7day';
			break;
			case '1m':
			type = '1month';
			break;
			case '3m':
			type = '3month';
			break;
			case '6m':
			type = '6month';
			break;
			case '12m':
			type = '12month';
			break;
			case 'overall':
			type = 'overall';
			break;
			default:
			message.reply("unknown type parameter");
			return;
		}

		const charturl = "http://tapmusic.net/collage.php?user=" + username + "&type=" + type + "&size=" + size + "&caption=true";
		const { body : chart_body } = await snekfetch.get(charturl);

		const msg = username + "'s " + size + ' chart (' + type + ')';
		message.channel.send(msg, {
			files: [chart_body]
		});

	},
};