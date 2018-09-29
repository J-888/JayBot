module.exports = (client) => {

	client.custom = { };

	/*
	MESSAGE CLEAN FUNCTION
	"Clean" removes @everyone pings, as well as tokens, and makes code blocks escaped so they're shown more easily.
	As a bonus it resolves promises and stringifies objects!
	This is mostly only used by the Eval and Exec commands.
	*/

	client.custom.clean = async (client, text) => {
		if (text && text.constructor.name == "Promise")
			text = await text;
		if (typeof evaled !== "string")
			text = require("util").inspect(text, {depth: 1});

		text = text
		.replace(/`/g, "`" + String.fromCharCode(8203))
		.replace(/@/g, "@" + String.fromCharCode(8203))

		.replace(client.config.token, "")
		.replace(client.config.fmAPIkey, "")
		.replace(client.config.geniusAPIkey, "");

		return text;
	};

	/* LOAD COMMAND */

	client.custom.loadCommand = (commandName) => {
		try {
			//client.logger.log(`Loading Command: ${commandName}`);
			const props = require(`./commands/${commandName}`);
			/*if (props.init) {
				props.init(client);
			}*/
			client.commands.set(props.name, props);

			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	};

	/* UNLOAD COMMAND */

	client.custom.unloadCommand = async (commandName) => {
		let command;
		if (client.commands.has(commandName)) {
			command = client.commands.get(commandName);
		}
		else
			return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

		/*if (command.shutdown) {
			await command.shutdown(client);
		}*/

		const mod = require.cache[require.resolve(`./commands/${commandName}`)];
		delete require.cache[require.resolve(`./commands/${commandName}.js`)];
		for (let i = 0; i < mod.parent.children.length; i++) {
			if (mod.parent.children[i] === mod) {
				mod.parent.children.splice(i, 1);
				break;
			}
		}
		return false;
	};

};
