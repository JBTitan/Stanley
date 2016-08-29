const config = require("config"),
	Promise = require("bluebird"),
	playNextFromQueue = require("../playnext");

const search = Promise.promisify(require("youtube-search"));

module.exports = {
	"name": "search",
	"aliases": [],
	"command": (stanley, message, args) => {
		voice = stanley.voice[message.channel.server.id]
		if (voice) {
			return search(args.join(" "), {
				"maxResults": 1,
				"key": config.get("youtube.apiKey"),
				"type": "video"
			}).then((results) => {
				let yturl = results[0].link;
				console.log("Queueing %s", yturl);

				if (voice.queue.length === 0 && !voice.connection.playing) {
					voice.queue.push(yturl);
					return playNextFromQueue(voice, stanley);
				} else {
					voice.queue.push(yturl);
					return message.reply("Added to queue. Queue length is now " + voice.queue.length);
				}
			});
		} else {
			return message.reply("I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
}
