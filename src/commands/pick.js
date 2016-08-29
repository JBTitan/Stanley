const crypto = require("crypto"),
	Promise = require("bluebird");

module.exports = {
	"name": "pick",
	"aliases": ["choose", "select", "compare"],
	"command": (stanley, message, args) => {
		let options = args.join(" ").split(",");

		// We compare hashes of the items, that way results are consistent.
		return Promise.map(options, (option) => {
			let hash = crypto.createHash("sha256");
			hash.update(option.toLowerCase().trim());
			return [hash.digest("hex"), option];
		}).then((options) => {
			options.sort();
			return message.reply("I choose **" + options[0][1].trim() + "**");
		});
	}
}
