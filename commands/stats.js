const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: 'stats',
	description: 'Gives some useful bot statistics',
	guildOnly: true,
	execute(message, args) {
		const duration = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
		moment().format(" D [days], H [hrs], m [mins], s [secs]");	

		message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${message.client.users.size.toLocaleString()}
• Servers    :: ${message.client.guilds.size.toLocaleString()}
• Channels   :: ${message.client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"});
	},
};