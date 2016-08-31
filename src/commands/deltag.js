const Promise = require("bluebird");

const fs = Promise.promisifyAll(require("fs"));

module.exports = {
	"name": "deltag",
	"aliases": ["dtag", "dt"],
	"description": "Deletes tags tags",
	"command": (stanley, message, args) => {
		if (message.server) {
			if (args.length === 1) {
				// Send tag args[0]
				return fs.unlinkAsync("tags/" + message.server.id + "/" + args[0]).then((data) => {
					return message.reply("Tag `" + args[0] + "` has been successfully deleted.");
				}).catch((err) => {
					return message.reply("There was an error deleting that tag.");
				});
			}
		} else {
			return new Promise((resolve, reject) => {resolve();});
		}
	}
};
