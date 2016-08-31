const Promise = require("bluebird");

const fs = Promise.promisifyAll(require("fs")),
	mkdirp = Promise.promisify(require("mkdirp"));

module.exports = {
	"name": "tag",
	"aliases": ["tags", "t"],
	"description": "Views/edits tags",
	"command": (stanley, message, args) => {
		if (message.server) {
			if (args.length === 0) {
				// List tags
				return fs.readdirAsync("tags/" + message.server.id).then((tags) => {
					return message.reply(tags.join(", "));
				});
			}
			if (args.length === 1) {
				let tagname = args[0].toLowerCase();
				return fs.readFileAsync("tags/" + message.server.id + "/" + tagname).then((data) => {
					return message.reply(data);
				}).catch((err) => {
					return message.reply("That tag could not be found.");
				});
			}
			if (args.length > 1) {
				let tag = args.shift().toLowerCase();
				return mkdirp("tags/" + message.server.id).then(() => {
					return fs.writeFileAsync("tags/" + message.server.id + "/" + tag, args.join(" ")).then(() => {
						return message.reply("Your tag has been saved.");
					});
				}).catch((err) => {
					return fs.writeFileAsync("tags/" + message.server.id + "/" + tag, args.join(" ")).then(() => {
						return message.reply("Your tag has been saved.");
					});
				});
			}
		} else {
			return new Promise((resolve, reject) => {resolve();});
		}
	}
};
