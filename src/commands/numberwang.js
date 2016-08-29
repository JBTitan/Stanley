module.exports = {
	"name": "numberwang",
	"aliases": ["nw"],
	"command": (stanley, message, args) => {
		let nope = [
			"No.",
			"Sorry, no.",
			"Sorry, but no.",
			"Nope",
			"Sorry, nope.",
			"Nadda.",
			"Zilch.",
			"That's not numberwang."
		]
		if (args.length > 0) {
			return message.reply(Math.random() > 0.9 ? "THATS NUMBERWANG!" + (Math.random() > 0.6 ? " SPIN THE BOARD!" : "") : nope[Math.floor(Math.random() * nope.length)]);
		} else {
			return message.reply("Please provide input");
		}
	}
}
