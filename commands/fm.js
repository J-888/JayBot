const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
	name: 'fm',
	description: 'Shows most recent last.fm scrobbles',
	aliases: ['last', 'last.fm', 'lastfm'],
    guildOnly: true,
    args: true,
    usage: '<username> [count]',
	async execute(message, args) {

		const username = args[0];
		var count = 1;

		if(args.length >= 2){
			count = parseInt(args[1], 10);
			count = Math.max(Math.min(count, 5), 1);
		}
		
		const urlGETRecent = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+username+"&api_key="+message.client.config.fmAPIkey+"&format=json";
		const { body : recent_body } = await snekfetch.get(urlGETRecent);
		//console.log(recent_body);

		if(recent_body.error) {
			message.channel.send("User not found");
			return
		}

		const songName = recent_body.recenttracks.track[0].name;
		const artistName = recent_body.recenttracks.track[0].artist["#text"];
		const artistID = recent_body.recenttracks.track[0].artist.mbid;
		const albumImageSize = recent_body.recenttracks.track[0].image.length - 1;
		const albumImage = recent_body.recenttracks.track[0].image[albumImageSize]["#text"];
		const nowPlaying = recent_body.recenttracks.track[0].date == undefined;

		if(!nowPlaying){
			const songDate = new Date(recent_body.recenttracks.track[0].date["#text"]);
		}

		const urlGETuser = "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user="+username+"&api_key="+message.client.config.fmAPIkey+"&format=json";
		const { body : user_body } = await snekfetch.get(urlGETuser);
		//console.log(user_body);

		const user_url = user_body.user.url;
		const userImageSize = user_body.user.image.length - 1;
		const userImage = user_body.user.image[userImageSize]["#text"];

		const urlGETartist = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid="+artistID+"&api_key="+message.client.config.fmAPIkey+"&format=json";
		const { body : artist_body } = await snekfetch.get(urlGETartist);
		//console.log(artist_body);

		//const artist_url = artist_body.artist.url;
		const artistImageSize = artist_body.artist.image.length - 1;
		const artistImage = artist_body.artist.image[artistImageSize]["#text"];	

		const embed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setTitle(artistName+" - "+songName)
			.setURL(user_url)
			.setAuthor(username, userImage, user_url)
			.setThumbnail(artistImage)
			.setImage(albumImage)
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		if(nowPlaying)
			embed.setTimestamp();
		else			
			embed.setTimestamp(songDate)

		if (count == 2)
			embed.setDescription("Previous track:")
		else if (count > 2)
			embed.setDescription("Previous tracks:")

		for (var i = 1; i < count; i++){
			const extra_songName = recent_body.recenttracks.track[i].name;
			const extra_artistName = recent_body.recenttracks.track[i].artist["#text"];
			embed.addField(extra_songName, extra_artistName, false)
		}

		message.channel.send({embed});	

	},
};