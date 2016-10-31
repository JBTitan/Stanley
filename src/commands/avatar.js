module.exports = {
	"name": "avatar",
	"aliases": ["thelastairbender", "tla", "profilepic", "pic", "picture"],
	"description": "Returns a user's avatar",
	"command": (stanley, message, args) => {
		let user = message.mentions.users.first();
		if (user) {
			return message.reply(user.avatarURL);
		} else {
			return message.reply("User not found.");
		}
	}
};
