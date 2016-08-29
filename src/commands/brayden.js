const config = require("config");

module.exports = {
	"name": "brayden",
	"aliases": ["gayden"],
	"description": "gay",
	"command": (stanley, message, args) => {
		return message.reply(config.get("bot.braydenImage"));
	}
};
