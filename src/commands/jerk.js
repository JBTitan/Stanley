const reddit = require("../reddit");

module.exports = {
	"name": "jerk",
	"aliases": ["circlejerk"],
	"description": "Cyclically jerks",
	"command": function(stanley, message) {
		return reddit.getSelfPost(["circlejerk"]).then((post) => {
			let text = "**" + post.data.title + "**\n";
			text += post.data.selftext;
			return stanley.reply(message, text, {});
		});
	},
	"shitpost": true
};
