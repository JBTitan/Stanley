const playNextFromQueue = require ("../playnext");

module.exports = {
	"name": "next",
	"aliases": ["skip"],
	"command": (stanley, message, args) => {
		let voice = stanley.voice[message.channel.server.id];
		if (voice) {
			if (voice.connection.playing) {
				return playNextFromQueue(voice, stanley);
			} else {
				return message.reply("I'm not playing anything, you hecking doofus.");
			}
		} else {
			return message.reply("I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
};
