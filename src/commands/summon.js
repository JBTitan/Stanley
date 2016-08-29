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
				return stanley.reply(message, "Joined voice channel " + connection.voiceChannel.name)
				//return connection.playFile("https://upload.wikimedia.org/wikipedia/en/d/d0/Rick_Astley_-_Never_Gonna_Give_You_Up.ogg");
			});
		}
	}
}
