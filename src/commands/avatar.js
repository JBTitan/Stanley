module.exports = {
	"name": "avatar",
	"aliases": ["thelastairbender", "tla", "profilepic", "pic", "picture"],
	"description": "Returns a user's avatar",
	"command": function(stanley, message, args) {
		let user = message.mentions[0];
		if (user) {
			return stanley.reply(message, user.avatarURL);
		} else {
			return stanley.reply(message, "User not found.");
		}
	},
	"shitpost": true
};
