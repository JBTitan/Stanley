const reddit = require("../reddit");

module.exports = {
	"name": "meme",
	"aliases": ["meem", "meam", "maymay"],
	"description": "Sends a meme",
	"command": function(stanley, message) {
		return reddit.getImgurLink(["me_irl", "meirl", "meirl_"]).then((url) => {
			return stanley.reply(message, url);
		});
	},
	"shitpost": true
};
