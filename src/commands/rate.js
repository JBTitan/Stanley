const crypto = require("crypto"),
	Promise = require("bluebird");

module.exports = {
	"name": "rate",
	"aliases": [],
	"command": (stanley, message, args) => {
		let item = args.join(" ").trim();
		let hash = crypto.createHash("sha256");
		hash.update(item.toLowerCase());
		let rating = (parseInt("0x" + hash.digest("hex").substr(0, 4)) % 21) / 2;

		return message.reply("I give **" + item + "** a **" + rating + "/10**");
	}
};
