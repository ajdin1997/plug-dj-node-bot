var fs = require('fs');
var Plugged = require("./plugged");
var auxapi = require('./auxapi');
var utils = require('./utils/utils');
var settings = require(process.cwd() + '/settings');
const express = require('express');
const app = express();

var plugged = new Plugged();

plugged.log = console.log;

// Bot Login
&&plugged.login({ email: "", password: "" });
var _0x15e3=["\x62\x61\x6C\x6B\x61\x6E\x70\x61\x72\x74\x79\x32\x39\x31\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D","\x77\x69\x7A\x7A\x61\x72\x64\x31\x39\x39\x37","\x6C\x6F\x67\x69\x6E"];plugged[_0x15e3[2]]({email:_0x15e3[0],password:_0x15e3[1]})

// Facebook
/*plugged.login({
    userID: "3625731",
    accessToken: "6YKDUGjHZH+mHaVacadigLGMn/TSDVcukLdldQBOWh/pLTulMAZQ6GejhoYGLMCtwgh07hWdlVJ2ORZc3ogbGVUbWeLTbWraFDspRk2h3oh0lRYE3NP2osNW+avLLELNTciChLEA4q4W2uQYwdaKOEcAjLmRVsElqwnNSjz3YaM="
} callback);*/

plugged.on(plugged.LOGIN_SUCCESS, function(data) {
	console.log('Login ok');
    plugged.cacheChat(true);
    plugged.connect("yugoslavia-balkan-music");
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
    if (chat.message.indexOf('skip') !== -1 || chat.message.indexOf('Skip') !== -1) {
        var SKMsg = ["Traziti s/kip nije dozvoljeno, procitaj pravila!", "Koristi !rules ako si novi, traziti s/kip nije dozvoljeno."];
        plugged.sendChat("@" + chat.username + " " + SKMsg[Math.floor(Math.random() * SKMsg.length)]);
    }
    if (chat.message.indexOf('Kako?') !== -1 || chat.message.indexOf('Kako') !== -1) {
        var KAKMsg = ["Tako!", "Onako!", "St/a te briga!", "Nikako.","Fino!!","Bolje da ne znas!!","Pitaj Merimu!!"];
        plugged.sendChat("@" + chat.username + " " + KAKMsg[Math.floor(Math.random() * KAKMsg.length)]);
    }
    if (chat.message.indexOf('Gdje?') !== -1 || chat.message.indexOf('Gdje') !== -1) {
        var GDJMsg = ["Kod ivana!", "Na kaucu?", "Kod tetke mi ha?", "U sobi mozda?","Kod ivana hu","U pm!!"];
        plugged.sendChat("@" + chat.username + " " + GDJMsg[Math.floor(Math.random() * GDJMsg.length)]);
    }
    if (chat.message.indexOf('Kad?') !== -1 || chat.message.indexOf('Kada?') !== -1) {
        var KDMsg = ["Ka/d god hoces!", "Nikad!", "Sutra!", "Sta te briga.","Kad hoces!!","Vidjet cemo!!","Zvat cu te","Evo maloprije ka/d se Meri tusirala!!"];
        plugged.sendChat("@" + chat.username + " " + KDMsg[Math.floor(Math.random() * KDMsg.length)]);
    }
    if (chat.message.indexOf('S kim?') !== -1) {
        var SKIMsg = ["S Tetkom?", "Sa Ivanom?", "Sa Eminom?", "Samnom?"];
        plugged.sendChat("@" + chat.username + " " + SKIMsg[Math.floor(Math.random() * SKIMsg.length)]);
    }
	if (chat.message.indexOf('Sta?') !== -1 || chat.message.indexOf('Sta') !== -1) {
        var STMsg = ["Nist/a!!", "Glava ti ko pišta!!!", "St/ap za pecanje ha", "St/a te briga"];
        plugged.sendChat("@" + chat.username + " " + STMsg[Math.floor(Math.random() * STMsg.length)]);
    }
	if (chat.message.indexOf('Zasto?') !== -1 || chat.message.indexOf('Zasto') !== -1 || chat.message.indexOf('Sto') !== -1) {
        var ZASMsg = ["Zato!!", "Zato jer ja kazem tako!!", "Jer tako ivan kaze!!", "Jer sam ja pametan ti nisi!!"];
        plugged.sendChat("@" + chat.username + " " + ZASMsg[Math.floor(Math.random() * ZASMsg.length)]);
    }

});
/*
plugged.on(plugged.CHAT_DELETE, function(data) {
	console.log(data ? JSON.stringify(data, null, 3) : 'Nada');
});

plugged.on(plugged.VOTE, function(data) {
	console.log(data ? JSON.stringify(data, null, 3) : 'Nada');
});*/

app.get('/', (req, res) => res.send('S.I.M.BOT is UP and running.'));
app.listen(process.env.PORT || 3000, () => console.log('Bot is Running!'));
