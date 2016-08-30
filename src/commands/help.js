module.exports = {
	"name": "help",
	"aliases": [],
	"command": (stanley, message, args) => {
		let output = "```\n";
		for (let i = 0; i < stanley.commands.length; i++) {
			output += "!" + stanley.commands[i].name + "\n";
		}
		output += "```";
		return stanley.reply(message, output);
	}
};
