const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    let start = Math.floor(Date.now());
    request.get(`http://${botconfig.setup.server}/incl/lib/connection.php`, function callback(err, httpResponse, body) {
        let resTime = Math.floor(Date.now()) - start;
        if (httpResponse['statusCode'] == 200)
            return message.channel.send(`Servers are working! \nResponse Time: \`${resTime}ms\`\nCommand Speed: \`${Math.floor(Date.now()) - start}ms\``);
        else if (httpResponse['statusCode'] == 404)
            return message.channel.send("Server Cannot be found! Please make sure you have followed the Setup Guide \n `${setupguide}`");
        else
            return message.channel.send(`Servers aren't working. \nStatus code: \`${httpResponse['statusCode']} ${httpResponse['statusMessage']}\``);
    });
};
module.exports.config = {
    name: "ping",
    description: "checks if server is online",
    usage: `${botconfig.setup.prefix}ping`,
    accessableby: "Members",
    aliases: []
};
