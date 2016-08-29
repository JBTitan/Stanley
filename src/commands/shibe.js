const reddit = require("../reddit");

module.exports = {
	"name": "shibe",
	"aliases": ["shiba", "doge", "doggo", "pupper", "dog", "woofer", "borker"],
	"description": "Sends a shibe",
	"command": (stanley, message) => {
		return reddit.getImgurLink(["doge", "shiba", "shibe"]).then((url) => {
			return message.reply(url);
		});
	},
	"shitpost": true
};
