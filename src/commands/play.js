const playNextFromQueue = require ("../playnext");

module.exports = {
	"name": "play",
	"aliases": [],
	"command": (stanley, message, args) => {
		let voice = stanley.voice[message.channel.server.id]
		if (voice) {
			if (voice.queue.length === 0 && !voice.connection.playing) {
				voice.queue.push(args[0]);
				return playNextFromQueue(voice, stanley);
			} else {
				voice.queue.push(args[0]);
				return message.reply("Added to queue. Queue length is now " + voice.queue.length);
			}
		} else {
			return message.reply("I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
}
