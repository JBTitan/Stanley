module.exports = {
	"name": "queue",
	"aliases": [],
	"command": (stanley, message, args) => {
		voice = stanley.voice[message.channel.server.id]
		if (voice) {
			if (voice.queue.length > 0) {
				return stanley.reply(message, voice.queue.join("\n"));
			} else {
				voice.queue.push(args[0]);
				return stanley.reply(message, "The queue is empty.");
			}
		} else {
			return stanley.reply(message, "I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
}
