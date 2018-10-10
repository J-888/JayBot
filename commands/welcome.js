const Jimp = require('jimp');
const Discord = require('discord.js');

const fs = require('fs');

module.exports = {
	name: 'welcome',
	description: 'Welcomes and stuff',
	async execute(message, args) {

		const image = await Jimp.read('./images/marilyn-manson-banner.jpg');
		const pfp = await Jimp.read({ url: message.author.displayAvatarURL});
		const circlemask = await Jimp.read('./images/circlemask.png');

		const bg_width = image.bitmap.width;
		const bg_height = image.bitmap.height;

		const pfp_width = 100;
		const pfp_height = 100;

		const margin_y = 15;
		const margin_x = 15;
		pfp.scaleToFit(pfp_width, pfp_height);
		circlemask.scaleToFit(pfp_width, pfp_height);
		pfp.mask(circlemask);
		image.blit(pfp, margin_x, margin_y);

		//const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
		var font = await Jimp.loadFont('./fonts/tragan/tragan.fnt');

		//const usertext_str = message.author.username;
		const usertext_str = args[0];
		var usertext_height = Jimp.measureTextHeight(font, usertext_str);
		var usertext_width = Jimp.measureText(font, usertext_str);
		console.log(usertext_width);

		if(usertext_width > 450){
			if(usertext_width < 600){
				console.log('48');
				font = await Jimp.loadFont('./fonts/tragan/tragan48.fnt');
			}
			else if(usertext_width < 900){
				console.log('32');
				font = await Jimp.loadFont('./fonts/tragan/tragan32.fnt');
			}
			else if(usertext_width < 1200){
				console.log('32');
				font = await Jimp.loadFont('./fonts/tragan/tragan24.fnt');
			}
			else{
				console.log('16');
				font = await Jimp.loadFont('./fonts/tragan/tragan16.fnt');
			}

			usertext_height = Jimp.measureTextHeight(font, usertext_str);
			usertext_width = Jimp.measureText(font, usertext_str);
			console.log(usertext_width);
		}

		image.print(
			font,
			margin_x*2.0 + pfp_width, margin_y + pfp_height/2.0 - usertext_height/2.0 - 5,
			{
				text: usertext_str,
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
			}
		);

		const file = './temp/welcome_' + message.author.id + '.' + image.getExtension();
		const aux = await image.write(file);
		message.channel.send({files: [file]});

		fs.unlinkSync(file);

	    //const attachment = new Discord.Attachment(file, 'welcome-image.png');
	    //message.channel.send(`Welcome to the server, ${message.author}!`, attachment);

		/*
		Jimp.read({ url: message.author.displayAvatarURL})
		.then(image => {
		    const file = './temp/welcome_' + message.author.id + '.' + image.getExtension();

		    // do stuff with the image

	    	image.write(file);
			message.channel.send({files: [file]});
		    //const attachment = new Discord.Attachment(file, 'welcome-image.png');
		    //message.channel.send(`Welcome to the server, ${message.author}!`, attachment);
		})
		.catch(err => {
		    // handle an exception
		});*/
	},
};
