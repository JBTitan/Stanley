const Promise = require("bluebird"),
	ytdl = require("ytdl-core");

function getInfo(url) {
	return new Promise((resolve, reject) => {
		return ytdl.getInfo(url, (err, info) => {
			if (err) return reject(err);
			return resolve(info)
		})
	});
}

function playNextFromQueue(voice, stanley, causedByEvent) {
	if (voice.connection.playing && !causedByEvent) {
		console.log("Stopping stream playback via connection.stopPlaying")
		voice.connection.stopPlaying();
		if (voice.destroyStream) {
			voice.destroyStream();
		}
		return new Promise((resolve) => {resolve();});
	}

	let next = voice.queue.shift();
	if (next) {
		console.log("Getting info for url %s", next.url);

		return getInfo(next.url).then((info) => {
			if (info) {
				let stream = ytdl.downloadFromInfo(info, {"filter": "audioonly"})

				return voice.connection.playRawStream(stream, {
					"volume": 0.4
				}).then((streamIntent) => {
					voice.destroyStream = function() {
						console.log("Destroying stream");
						stream.destroy();
					};
					streamIntent.on("end", () => {
						console.log("Stream ended.");
						playNextFromQueue(voice, stanley, true);
					});

					return stanley.sendMessage(next.channelid, "Now playing: **" + info.title + "**, requested by " + stanley.users.get("id", next.userid).mention() + ". Queue length is " + voice.queue.length + ".");
				});
			} else {
				return playNextFromQueue(voice, stanley);
			}
		}).catch((err) => {
			console.log(err);
			return playNextFromQueue(voice, stanley);
		});
	} else {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}

module.exports = playNextFromQueue;
