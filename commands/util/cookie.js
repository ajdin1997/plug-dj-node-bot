var lang = require(process.cwd() + '/lang.json');
var utils = require(process.cwd() + '/utils/utils');
var auxapi = require(process.cwd() + '/auxapi');

var cookie = {
	commands: ['cookie'],
	cooldown: 5,
	lastUsed: 0,
	roleRequired: 'none',
	getCookieList: function (chat) {
                    var c = Math.floor(Math.random() * lang.fortunes.cookielist.length);
                    return lang.fortunes.cookielist[c];
                },
	exec: function(bot, chat, data) {
	 var msg = data.params.join(' ').substr(1).split(' @');
	 var user2 = auxapi.users.getUserByUsername(msg);
	    bot.sendChat(utils.replaceString(lang.fortunes.cookie2, {user: chat.username, nameto: user2,  cookie: this.getCookieList()}), 30e3);
	}
};

module.exports = cookie;