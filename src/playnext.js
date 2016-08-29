const ytdl = require("ytdl-core");

function playNextFromQueue(voice, stanley, causedByEvent) {
	if (voice.connection.playing && !causedByEvent) {
		console.log("Stopping stream playback via connection.stopPlaying")
		voice.connection.stopPlaying();
		if (voice.destroyStream) {
			voice.destroyStream();
		}
		return new Promise((resolve) => {resolve()});
	}

	let next = voice.queue.shift();
	if (next) {
		console.log("Playing url %s", next);
		let stream = ytdl(next, {
			"filter": "audioonly"
		});

		return voice.connection.playRawStream(stream, {
			"volume": 1
		}).then((streamIntent) => {
			voice.destroyStream = function() {
				console.log("Destroying stream");
				stream.destroy()
			};
			streamIntent.on("end", () => {
				console.log("Stream ended.");
				playNextFromQueue(voice, stanley, true);
			});
		});
	} else {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}

module.exports = playNextFromQueue;
