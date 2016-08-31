const Promise = require("bluebird");

const fs = Promise.promisifyAll(require("fs"));

module.exports = {
	"name": "deltag",
	"aliases": ["dtag", "dt"],
	"description": "Deletes tags tags",
	"command": (stanley, message, args) => {
		if (message.server) {
			if (args.length === 1) {
				let tagname = args[0].toLowerCase();
				return fs.unlinkAsync("tags/" + message.server.id + "/" + tagname).then((data) => {
					return message.reply("Tag `" + tagname + "` has been successfully deleted.");
				}).catch((err) => {
					return message.reply("There was an error deleting that tag.");
				});
			}
		} else {
			return new Promise((resolve, reject) => {resolve();});
		}
	}
};
