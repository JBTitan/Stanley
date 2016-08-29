module.exports = {
	"name": "summon",
	"aliases": [],
	"command": (stanley, message) => {
		if (message.author.voiceChannel) {
			return stanley.joinVoiceChannel(message.author.voiceChannel).then((connection) => {
				stanley.voice[message.author.voiceChannel.server.id] = {
					connection: connection,
					queue: [],
					server: message.author.voiceChannel.server
				};
				return stanley.reply(message, "Joined voice channel " + connection.voiceChannel.name);
			});
		}
	}
}
