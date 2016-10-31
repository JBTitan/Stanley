module.exports = {
	"name": "queue",
	"aliases": [],
	"command": (stanley, message, args) => {
		let voice = stanley.queue[message.channel.server.id];
		if (voice) {
			if (voice.queue.length > 0) {
				let items = [];
				for (let i = 0; i < voice.queue.length; i++) {
					items[i] = voice.queue[i].url;
				}
				return message.reply(items.join("\n"));
			} else {
				voice.queue.push(args[0]);
				return message.reply("The queue is empty.");
			}
		} else {
			return message.reply("I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
};
