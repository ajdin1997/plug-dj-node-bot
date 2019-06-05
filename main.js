var fs = require('fs');
var Plugged = require("./plugged");
var auxapi = require('./auxapi');
var utils = require('./utils/utils');
var settings = require(process.cwd() + '/settings');
const express = require('express');
const app = express();

var plugged = new Plugged();

plugged.log = console.log;

var _0xa8e6=["\x62\x61\x6C\x6B\x61\x6E\x70\x61\x72\x74\x79\x32\x39\x31\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D","\x77\x69\x7A\x7A\x61\x72\x64\x31\x39\x39\x37","\x6C\x6F\x67\x69\x6E"];plugged[_0xa8e6[2]]({email:_0xa8e6[0],password:_0xa8e6[1]})
/* Bot Login
plugged.login({ email: "", password: "" });
*/

// Facebook
/*plugged.login({
    userID: "1815685631810176",
    accessToken: "EAACA8EuogsIBAJZC3JDkcjMzb8sHRQlWZCHPlrmZA9z18kvTZCqhmy6bA2pswWeum6P3uufJQJzD87uuZCg3TVEDMUZA8ErVk5POQiEMBwIMzafU5xQ11Qv69DHZCKYN5tJsYbzXHwqVdhkqTqgZCH42LYyKvcP2z2cZD"
} callback);*/

plugged.on(plugged.LOGIN_SUCCESS, function(data) {
	console.log('Login ok');
    plugged.cacheChat(true);
    plugged.connect("best-party-19");
});

plugged.on(plugged.LOGIN_ERROR, function(err) {
	console.log('Erro no login');
    console.log(err);
});

plugged.on(plugged.JOINED_ROOM, function() {
	auxapi.init(plugged);
	settings.load();
	
	utils.loadModules(process.cwd() + '/events', function(module, path) {
		module.init(plugged);
	});
		
	plugged.woot();
	
//	require(process.cwd() + '/events/chat').init(plugged);
});

plugged.on(plugged.JOINED_ROOM, function _joinedRoom() {
    plugged.on(plugged.ADVANCE, function() {
        //WOOT!
        plugged.woot();
    });
});

plugged.on(plugged.USER_JOIN, function(user) {
    var greets = ['Dobrodosao/la <3 ', 'Svi pozelite dobrodoslicu ', 'Upravo je usao/la ','E bas smo o tebi pricali ','Pozdrav '];
    var greet = greets[Math.floor(Math.random()*greets.length)];
    plugged.sendChat(greet + "@" + user.username);
});

// S.A.M SADA GOVORI?
plugged.on(plugged.CHAT, function(chat) {
    if (chat.message == "skip" || chat.message == "Skip") {
        var SKMsg = ["Traziti s/kip nije dozvoljeno, procitaj pravila!", "Koristi !rules ako si novi, traziti s/kip nije dozvoljeno."];
        plugged.sendChat("@" + chat.username + " " + SKMsg[Math.floor(Math.random() * SKMsg.length)]);
    }
    if (chat.message == "Kako?" || chat.message == "Kako") {
        var KAKMsg = ["Tako!", "Onako!", "St/a te briga!", "Nikako.","Fino!!","Bolje da ne znas!!","Pitaj Merimu!!"];
        plugged.sendChat("@" + chat.username + " " + KAKMsg[Math.floor(Math.random() * KAKMsg.length)]);
    }
    if (chat.message == "Gdje" || chat.message == "Gdje?") {
        var GDJMsg = ["Kod ivana!", "Na kaucu?", "Kod tetke mi ha?", "U sobi mozda?","Kod ivana hu","U pm!!"];
        plugged.sendChat("@" + chat.username + " " + GDJMsg[Math.floor(Math.random() * GDJMsg.length)]);
    }
    if (chat.message == "Kada" || chat.message == "Kada?") {
        var KDMsg = ["Ka/d god hoces!", "Nikad!", "Sutra!", "Sta te briga.","Kad hoces!!","Vidjet cemo!!","Zvat cu te","Evo maloprije ka/d se Meri tusirala!!"];
        plugged.sendChat("@" + chat.username + " " + KDMsg[Math.floor(Math.random() * KDMsg.length)]);
    }
    if (chat.message == "S kim" || chat.message == "S kim?") {
        var SKIMsg = ["S Tetkom?", "Sa Ivanom?", "Sa Eminom?", "Samnom?"];
        plugged.sendChat("@" + chat.username + " " + SKIMsg[Math.floor(Math.random() * SKIMsg.length)]);
    }
	if (chat.message == "Sta" || chat.message == "Sta?") {
        var STMsg = ["Nist/a!!", "Glava ti ko pišta!!!", "St/ap za pecanje ha", "St/a te briga"];
        plugged.sendChat("@" + chat.username + " " + STMsg[Math.floor(Math.random() * STMsg.length)]);
    }
	if (chat.message == "Sto?" || chat.message == "Sto") {
        var ZASMsg = ["Zato!!", "Zato jer ja kazem tako!!", "Jer tako ivan kaze!!", "Jer sam ja pametan ti nisi!!"];
        plugged.sendChat("@" + chat.username + " " + ZASMsg[Math.floor(Math.random() * ZASMsg.length)]);
    }

});

 /*
plugged.on(plugged.CHAT_DELETE, function(data) {
	if(chat.message == "!" || chat.message.includes(" !") ){                
                  setTimeout(function () {
                  plugged.deleteMessage(chat.cid);
                    }, 5000, chat.cid);
   } 
});

plugged.on(plugged.VOTE, function(data) {
	console.log(data ? JSON.stringify(data, null, 3) : 'Nada');
});*/

app.get('/', (req, res) => res.send('S.A.M.BOT is UP and running.'));
app.listen(process.env.PORT || 3000, () => console.log('Bot is Running!'));
