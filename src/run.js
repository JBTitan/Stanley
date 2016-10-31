const config = require("config"),
	Discord = require("discord.js"),
	Path = require("path"),
	pmx = require("pmx")
	Promise = require("bluebird");

const fs = Promise.promisifyAll(require("fs"));

const stanley = new Discord.Client();

const probe = pmx.probe();

/**
 * An index of all the voice connections that also holds their queues.
 * @type {Object}
 */
stanley.voice = {};

/**
 * Handles generic errors and attempts to message them to the bot's master.
 * @param  {Error} err
 * @return {Promise} promise
 */
function errHandler(err) {
	console.error("Error:", err);

	return stanley.sendMessage(config.get("bot.master"), "Encountered error ```\n" + err + "\n```").catch((err) => {
		console.log("Error encountered trying to handle error: ", err);
	});
}

/**
 * Returns a command by the specified name
 * @param  {String} cmd - The name of the command to get
 * @return {Command} command - The command by the specified name
 */
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
		probe.metric({
			name: "Servers",
			value: () => {
				return stanley.servers.length;
			}
		});
		probe.metric({
			name: "Voice connections",
			value: () => {
				return stanley.voiceConnections.length;
			}
		})
		return console.log("Ready!");
	});
});

fs.readdirAsync(Path.join(__dirname, "commands")).map((path) => {
	return require(Path.join(__dirname, "commands", path));
}).then((commands) => {
	stanley.commands = commands;

	return stanley.loginWithToken(config.get("discord.botToken"));
});
