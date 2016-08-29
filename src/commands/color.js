const Promise = require("bluebird");

module.exports = {
	"name": "color",
	"aliases": ["c"],
	"description": "Sets a color",
	"command": (stanley, message, args) => {
		if (message.server) {
			let color = args[0];
			if (color.startsWith("#")) {
				color = color.substr(1);
			}

			if (color.length === 6) {
				color = parseInt("0x" + color);
				let role = message.server.roles.get("name", "Stanley color " + color);

				// Remove previous color roles
				let userRoles = message.server.rolesOfUser(message.author);

				return Promise.each(userRoles, (role) => {
					if (role.name.startsWith("Stanley color ")) {
						return message.author.removeFrom(role);
					}
				}).then(() => {
					if (role) {
						return message.author.addTo(role).then(() => {
							return message.reply("Your color has been changed.");
						});
					} else {
						return message.server.createRole({
							"color": color,
							"hoist": false,
							"name": "Stanley color " + color,
							"mentionable": false
						}).then((role) => {
							return message.author.addTo(role).then(() => {
								return message.reply("Your color has been changed.");
							});
						});
					}
				});
			} else {
				return message.reply("Unrecognized hex.");
			}
		} else {
			return message.reply("I can't do that :/");
		}
	}
};
