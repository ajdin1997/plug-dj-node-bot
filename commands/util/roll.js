var lang = require(process.cwd() + '/lang.json');
var utils = require(process.cwd() + '/utils/utils');
var auxapi = require(process.cwd() + '/auxapi');

var roll = {
	commands: ['roll'],
	cooldown: 1800,
	lastUsed: 0,
	deleteMessage: true,
	roleRequired: 'none',
	exec: function(bot, chat, data) {
	var randomMax = data.params[1] + 1;
					if ((isNaN(randomMax) == true) || (randomMax.length == 0)) {
						var randomMax = 60
					}
					var randomispis = Math.floor((Math.random() * randomMax) + 1)
					if(randomispis == 6) {				
	                                bot.sendChat("@" + chat.username + ", cestitam, upravo si osvojio prvo mjesto.");
					var name = chat.username;
					var user = auxapi.users.getUserByID(name);
					bot.moveDJ(user.id, 1);
	}
	else
					{
					bot.sendChat("@" + chat.username + ", tvoj nasumicno odabran broj je " + randomispis + ". Nemas srece. Pokusaj ponovo poslije.");
					}
		}
					
};

module.exports = roll;
