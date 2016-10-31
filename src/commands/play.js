const playNextFromQueue = require ("../playnext");

module.exports = {
	"name": "play",
	"aliases": [],
	"command": (stanley, message, args) => {
		let voice = stanley.queue[message.guild.id];
		if (voice) {
			voice.queue.push({
				url: args[0],
				userid: message.author.id,
				channelid: message.channel.id
			});
			if (voice.queue.length === 1 && !voice.connection.playing) {
				return playNextFromQueue(voice, stanley);
			} else {
				return message.reply("Added to queue. Queue length is now " + voice.queue.length);
			}
		} else {
			return message.reply("I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
};
