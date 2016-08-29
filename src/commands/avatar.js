module.exports = {
	"name": "avatar",
	"aliases": ["thelastairbender", "tla", "profilepic", "pic", "picture"],
	"description": "Returns a user's avatar",
	"command": function(stanley, message, args) {
		let user = message.mentions[0];
		if (user) {
			return message.reply(user.avatarURL);
		} else {
			return message.reply("User not found.");
		}
	},
	"shitpost": true
};
