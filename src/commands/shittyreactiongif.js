const reddit = require("../reddit");

module.exports = {
	"name": "shittyreactiongif",
	"aliases": ["shittyreactiongifs", "react", "reactshittily", "reaction", "shittyreaction", "shittyreactions"],
	"description": "Sends a shitty reaction gif",
	"command": function(stanley, message) {
		return reddit.getImgurLink(["shittyreactiongifs"]).then((url) => {
			return stanley.reply(message, url);
		});
	},
	"shitpost": true
}
