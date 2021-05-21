const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
const parse = require(`${__dirname}/../lib/parse.js`);
module.exports.run = async (bot, message, args) => {
    if (args.length == 0)
        return message.channel.send("Please enter a user you want to search for");
    let endpoint1Start = Math.floor(Date.now());
    request.post(`http://${botconfig.setup.server}/getGJUsers20.php`, {
        form: {
            gameVersion: 21,
            binaryVersion: 35,
            gdw: 0,
            str: args[0],
            total: 0,
            page: 0,
            secret: "Wmdf2893gb7"
        }
    }, function callback(err, httpResponse, body) {
        let endpoint1End = Math.floor(Date.now());
        if (body == '-1')
            return message.channel.send(`Could not find the user: \`${args[0]}\``);
        let bodyArr = body.split('#');
        let users = [];
        let userData, userObjectArr = [], data;
        if (bodyArr[0].includes('|') == true)
            users = bodyArr[0].split('|');
        else
            users[0] = bodyArr[0];
        let searchData = bodyArr[1].split(':');
        let total = searchData[0];
        let page = searchData[1];
        let pageMax = searchData[2];
        for (let i = 0; i < users.length; i++) {
            data = parse.parseResponse(users[i]);
            userData = {
                name: data[1],
                playerID: data[2],
                stars: data[3],
                demons: data[4],
                cp: data[8],
                iconID: data[9],
                colour1: data[10],
                colour2: data[11],
                secretCoins: data[13],
                iconType: data[14],
                glow: data[15],
                accountID: data[16],
                userCoins: data[17]
            };
            userObjectArr.push(userData);
        }
        let priority = 0;
        for (let i = 0; i < userObjectArr.length; i++) {
            if (args[0].toLowerCase() === userObjectArr[i]['name'].toLowerCase()) {
                priority = i;
            }
        }
        let newUser = userObjectArr[priority];
        let endpoint2Start = Math.floor(Date.now());
        request.post(`http://${botconfig.setup.server}/getGJUserInfo20.php`, {
            form: {
                targetAccountID: newUser['accountID'],
                gjp: "gjp",
                secret: "Wmdf2893gb7"
            }
        }, function callback(err, httpResponse, body) {
            let endpoint2End = Math.floor(Date.now());
            let userdata = parse.parseResponse(body);
            data = {
                name: userdata[1],
                playerID: userdata[2],
                stars: userdata[3],
                demons: userdata[4],
                cp: userdata[8],
                colour1: userdata[10],
                colour2: userdata[11],
                secretCoins: userdata[13],
                accountID: userdata[16],
                userCoins: userdata[17],
                messageState: userdata[18],
                friendRequestState: userdata[19],
                youtube: userdata[20],
                cube: userdata[21],
                ship: userdata[22],
                ball: userdata[23],
                ufo: userdata[24],
                wave: userdata[25],
                robot: userdata[26],
                glow: userdata[28],
                isRegistered: userdata[29],
                rank: userdata[30],
                spider: userdata[43],
                twitter: userdata[44],
                twitch: userdata[45],
                diamonds: userdata[46],
                explosion: userdata[48],
                mod: userdata[49],
                commentHistoryState: userdata[50]
            };
            let modRank;
            switch (data['mod']) {
                case '1':
                    modRank = `${botconfig.emotes.mod} `;
                    break;
                case '2':
                    modRank = `${botconfig.emotes.elderMod} `;
                    break;
                default:
                    modRank = '';
                    break;
            }
            let devFooter = '';
            if (botconfig.devmode == true) {
                devFooter =
                    `\n[DEV] getGJUsers: ${endpoint1End - endpoint1Start}ms | getGJUserInfo: ${endpoint2End - endpoint2Start}ms `;
            }
            const profile = new Discord.MessageEmbed().setColor(`0x${botconfig.setup.commandColour}`)
                .setTitle(`${modRank}__${data['name']}__`)
                .setDescription(`${botconfig.emotes.leaderboardRank} ${data['rank']}`)
                .addField('__stats__', `${botconfig.emotes.star} ${data['stars']}\n${botconfig.emotes.diamond} ${data['diamonds']}\n${botconfig.emotes.secretCoin} ${data['secretCoins']}\n${botconfig.emotes.userCoin} ${data['userCoins']}\n${botconfig.emotes.demon} ${data['demons']}\n${botconfig.emotes.cp} ${data['cp']}`)
                .setFooter(`AccountID: ${data['accountID']} | PlayerID: ${data['playerID']}${devFooter}`);
            message.channel.send(profile);
        });
        console.log(`Total Users: ${total}, PageNumber: ${page}, UsersPerPage: ${pageMax}`);
    });
};
module.exports.config = {
    name: "user",
    description: "Searches users in the GDPS",
    usage: `${botconfig.setup.prefix}user`,
    accessableby: "Members",
    aliases: ['profile']
};
