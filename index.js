const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const bot = new Discord.Client({ disableEveryone: true });
var time = Math.floor(Date.now());
require("./util/eventHandler")(bot);
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err)
        console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("[LOGS] couldnt find commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});
bot.on("message", async (message) => {
    message.content = message.content.toLowerCase();
    if (message.author.bot || message.channel.type === "dm")
        return;
    let prefix = botsettings.setup.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix))
        return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (message.content == `${prefix}cron`) {
        if (Math.floor(Date.now() - time) < (botsettings.setup.cronCooldown * 1000)) {
            return message.channel.send(`Please wait \`${(((botsettings.setup.cronCooldown * 1000) - (Math.floor(Date.now() - time)))) / 1000}\` more seconds`);
        }
        else {
            time = Math.floor(Date.now());
            console.log("[LOG] No Cooldown");
        }
    }
    if (commandfile)
        commandfile.run(bot, message, args);
});
bot.login(botsettings.setup.token);
