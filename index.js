const fs = require('fs');
const Discord = require('discord.js');

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const winston = require('winston');
const {Loggly} = require('winston-loggly-bulk');
require('winston-daily-rotate-file');

const consoleTransport = new winston.transports.Console({
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.prettyPrint(),
		winston.format.splat(),
		winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
	)
});

const DRFtransport = new (winston.transports.DailyRotateFile)({
	filename: './log-%DATE%.log',
	dirname: 'logs',
	datePattern: 'YYYY-MM-DD--HH-mm',
	frequency: '1d',
	maxSize: '20k',
	maxFiles: '7d'
});
const DRFException = new (winston.transports.DailyRotateFile)({
	filename: './exc-%DATE%.log',
	dirname: 'logs',
	datePattern: 'YYYY-MM-DD--HH-mm',
	frequency: '1d',
	maxSize: '20k',
	maxFiles: '7d'
});
DRFtransport.on('rotate', function(oldFilename, newFilename) {
	console.log('rotate from ' + oldFilename +' to ' + newFilename);
});

const LogglyTransport = new Loggly({
    token: "189de478-68cf-4cfc-97a1-9c20e8816d2c",
    subdomain: "JMTG888",
    tags: ["Winston-NodeJS"],
    json: true
});

var logger = winston.createLogger({
	exitOnError: false,
	//format: formatFix,
	transports: [consoleTransport, DRFtransport, LogglyTransport],
	exceptionHandlers: [consoleTransport, DRFException, LogglyTransport, new winston.transports.File({ filename: 'exceptions.log', timestamp: true })]
});

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.config = require("./config.json");
client.config.token = process.env.TOKEN;
client.config.fmAPIkey = process.env.FMAPIKEY;

require("./custom_functions.js")(client);

const Enmap = require("enmap");
client.enmap_fm = new Enmap({
	name: "enmap_fm",
	fetchAll: false,
	autoFetch: true
});

client.util = require('util');
client.util.inspect.defaultOptions = { showHidden: false, depth: 2, colors: false, customInspect: true, showProxy: false, maxArrayLength: 100, breakLength: 80, compact: true }

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
	client.user.setActivity('Marilyn Manson', { type: 'LISTENING' });
	console.log('Bot ready!');
});

client.on('message', message => {
	if (message.author.bot || !message.content.startsWith(client.config.prefix)) return;

	const args = message.content.slice(client.config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

//client.login(client.config.token);