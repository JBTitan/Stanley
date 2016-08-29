const playNextFromQueue = require ("../playnext");

module.exports = {
	"name": "play",
	"aliases": [],
	"command": (stanley, message, args) => {
		voice = stanley.voice[message.channel.server.id]
		if (voice) {
			if (voice.queue.length === 0 && !voice.connection.playing) {
				voice.queue.push(args[0]);
				return playNextFromQueue(voice, stanley);
			} else {
				voice.queue.push(args[0]);
				return stanley.reply(message, "Added to queue. Queue length is now " + voice.queue.length);
			}
		} else {
			return stanley.reply(message, "I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
}
