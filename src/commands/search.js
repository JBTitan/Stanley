const config = require("config"),
	Promise = require("bluebird"),
	playNextFromQueue = require("../playnext");

const search = Promise.promisify(require("youtube-search"));

module.exports = {
	"name": "search",
	"aliases": [],
	"command": (stanley, message, args) => {
		let voice = stanley.queue[message.guild.id];
		if (voice) {
			return search(args.join(" "), {
				"maxResults": 1,
				"key": config.get("youtube.apiKey"),
				"type": "video"
			}).then((results) => {
				let yturl = results[0].link;
				console.log("Queueing %s", yturl);

				voice.queue.push({
					url: yturl,
					user: message.author,
					channel: message.channel
				});

				if (voice.queue.length === 1 && !voice.connection.playing) {
					return playNextFromQueue(voice, stanley);
				} else {
					return message.reply("Added to queue. Queue length is now " + voice.queue.length);
				}
			});
		} else {
			return message.reply("I'm not currently in a voice channel. You can summon me with `!summon`");
		}
	}
};
