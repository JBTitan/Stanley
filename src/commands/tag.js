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
					message.reply(tags.join(", "));
				});
			}
			if (args.length === 1) {
				// Send tag args[0]
				return fs.readFileAsync("tags/" + message.server.id + "/" + args[0]).then((data) => {
					return message.reply(data);
				});
			}
			if (args.length > 1) {
				// Set tag args[0] to args[1...]
				let tag = args.shift();
				return mkdirp("tags/" + message.server.id).then(() => {
					return fs.writeFileAsync("tags/" + message.server.id + "/" + tag, args.join(" "));

				}).catch((err) => {
					return fs.writeFileAsync("tags/" + message.server.id + "/" + tag, args.join(" "));
				});
				//return message.reply("Not yet implemented.");
			}
		} else {
			return new Promise((resolve, reject) => {resolve();});
		}
	}
};
