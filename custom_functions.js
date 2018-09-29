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

};
