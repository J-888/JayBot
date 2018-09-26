const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
	name: 'chart',
	description: "Shows user's last.fm charts",
	//aliases: ['last', 'last.fm', 'lastfm'],
    guildOnly: true,
    args: true,
    usage: '<username> [size] [type]`\nSizes: `3(default), 4, 5, 2`\nTypes: `7d(default), 1m, 3m, 6m, 12m, overall',
	async execute(message, args, client) {

		var size = '3x3';
		var type = '7day';
		var skipped2ndParam = false;

		if(args.length >= 2){
			const param = args[1];
			switch(param) {
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
				skipped2ndParam = true;
			}
		}

		if((skipped2ndParam && args.length >= 2) || args.length >= 3){
			const param = skipped2ndParam ? args[2] : args[1];
			switch(param) {
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
			}
		}

		const charturl = "http://tapmusic.net/collage.php?user=" + args[0] + "&type=" + type + "&size=" + size + "&caption=true";
		const { body : chart_body } = await snekfetch.get(charturl);

		const msg = args[0] + "'s " + size + ' chart (' + type + ')';
		message.channel.send(msg, {
			files: [chart_body]
		});

	},
};