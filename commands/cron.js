const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    if (!botconfig.setup.cronEnabled)
        return message.reply(`The cron command is currently disabled`);
    let start = Math.floor(Date.now());
    message.channel.send(`Starting the Cron Job...`);
    request.get(`http://${botconfig.setup.server}/tools/cron/cron.php`, function callback(err, httpResponse, body) {
        let end = Math.floor(Date.now());
        if (httpResponse['statusCode'] == 200)
            return message.channel.send(`Cron Job Success!\nResponse Time: \`${end - start}ms\``);
        else
            return message.channel.send(`Something went wrong. \nStatus Code: \`${httpResponse['statusCode']} ${httpResponse['statusMessage']}\``);
    });
};
module.exports.config = {
    name: "cron",
    description: "Triggers the cron Job",
    usage: `${botconfig.setup.prefix}cron`,
    accessableby: "Members",
    aliases: ['cp', 'refresh']
};
