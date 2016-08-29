const config = require("config");

module.exports = {
	"name": "brayden",
	"aliases": ["gayden"],
	"description": "gay",
	"command": function(stanley, message, args) {
		return message.reply(config.get("bot.braydenImage"));
	},
	"shitpost": true
};
