const Promise = require("bluebird");

const reddit = Promise.promisifyAll(require("redditor")),
	Url = require("url");

reddit.getRandomPost = function(subs) {
	return this.getAsync("/r/" + subs.join("+") + "/random.json").then((res) => {
		let children = (res.data || res[0].data).children;
		let post = children[Math.floor(children.length * Math.random())];
		return post;
	});
};

reddit.getSelfPost = function(subs) {
	return this.getRandomPost(subs).then((post) => {
		if (post.data.is_self) {
			return post;
		} else {
			return this.getSelfPost(subs);
		}
	});
};

reddit.getLink = function(subs, hostRegex) {
	return this.getRandomPost(subs).then((post) => {
		if (!post.data.is_self && Url.parse(post.data.url).host.match(hostRegex)) {
			return post;
		} else {
			return this.getLink(subs);
		}
	});
};

reddit.getImgurLink = function(subs) {
	return this.getLink(subs, /^(i\.)?imgur\.com/i).then((post) => {
		return post.data.url;
	});
};

module.exports = reddit;
