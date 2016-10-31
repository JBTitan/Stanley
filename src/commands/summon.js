module.exports = {
	"name": "summon",
	"aliases": [],
	"command": (stanley, message) => {
		if (message.member && message.member.voiceChannel && message.member.voiceChannel.joinable) {
			return message.member.voiceChannel.join().then((connection) => {
				stanley.queue[message.guild.id] = {
					connection: connection,
					queue: [],
					server: message.guild.id
				};

				return message.reply("Joined voice channel " + message.member.voiceChannel.name);
			});
		} else {
			return message.reply("You aren't in a voice channel");
		}
	}
};
