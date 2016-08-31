const urban = require("urban");

module.exports = {
	"name": "urbandictionary",
	"aliases": ["define", "urband", "ud"],
	"description": "Returns a definition from Urban Dictionary",
	"command": (stanley, message, args) => {
		let query = args.join(" ").trim();

		if (query.length > 0) {
			return new Promise((resolve, reject) => {
				urban(query).first((result) => {
					if (result) {
						resolve(message.reply("**" + result.word + "**: " + result.definition));
					} else {
						resolve(message.reply("A definition could not be found."));
					}
				});
			});
		} else {
			return message.reply("Please specifiy a word to look up.");
		}
	}
};
