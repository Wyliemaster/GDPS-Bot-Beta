const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    const diff = {
        easy: "https://media.discordapp.net/attachments/753349180885565481/781979805351804938/Easy.png",
        feasy: "https://media.discordapp.net/attachments/753349180885565481/782665587737493534/easyFeature.png"
    };
    console.log(args[0]);
    message.reply(diff[args[0]]);
};
module.exports.config = {
    name: "test",
    description: "checks if server is online",
    usage: `${botconfig.setup.prefix}ping`,
    accessableby: "Members",
    aliases: []
};
