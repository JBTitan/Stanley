const config = require("config"),
	Discord = require("discord.js"),
	Path = require("path"),
	Promise = require("bluebird");

const fs = Promise.promisifyAll(require("fs"));

const stanley = new Discord.Client();

stanley.voice = {};

function errHandler(err) {
	console.log("Error:", err);
}

function getCommand(cmd) {
	for (let i = 0; i < stanley.commands.length; i++) {
		if (stanley.commands[i].name === cmd.toLowerCase() || stanley.commands[i].aliases.indexOf(cmd.toLowerCase()) > -1) {
			return stanley.commands[i];
		}
	}
}

stanley.on("message", function(message) {
	if (message.content.startsWith("!")) {
		let args = message.content.split(" ");
		let cmd = getCommand(args.shift().substr(1));

		if (cmd) {
			cmd.command(stanley, message, args).catch(errHandler);
		}
		// Don't do anything if the command doesn't exist
	} else {
		let metoothanksregex = /(i ((want to )?(end (me|my life|this|it|everything|myself)|die|kill (myself|me)|commit suicide)|hate ((my )?life|me|myself|every(thing|one)|this))|fuck( my)? life)/i;

		if (message.content.match(metoothanksregex)) {
			return message.reply("`me too, thanks`").catch(errHandler);
		} else if (message.isMentioned(stanley.user)) {
			return message.reply("`no u`");
		}
	}
});

stanley.on("ready", () => {
	return stanley.setStatus("online", "with ur mums weiner").then(() => {
		return stanley.setUsername("Stanley");
	}).then(() => {
		return console.log("Ready!");
	});
});

fs.readdirAsync(Path.join(__dirname, "commands")).map((path) => {
	return require(Path.join(__dirname, "commands", path));
}).then((commands) => {
	stanley.commands = commands;
	return stanley.loginWithToken(config.get("discord.botToken"));
});
