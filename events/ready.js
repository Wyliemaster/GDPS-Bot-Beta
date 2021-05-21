const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
const parse = require(`./../lib/parse.js`);
const levelconfig = require("../levelconfig.json");
// links to Difficulty Faces. for custom difficulties just add items to this object and then add the key to the switch tables
module.exports = (bot, message) => {
    let logs = bot.channels.cache.get(botconfig.logs.channel);
    if (botconfig.logs.enabled) {
        logs.send(`${bot.user.username} is online\n${Date()}`);
    }
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity(botconfig.setup.customStatus, { type: "PLAYING" });
    setInterval(function () {
        console.log("Checking Awarded");
        request.post(`http://${botconfig.setup.server}/getGJLevels21.php`, {
            form: {
                gameVersion: 21,
                binaryVersion: 35,
                type: 11,
                secret: "Wmdf2893gb7"
            }
        }, function callback(err, httpResponse, body) {
            if (body == -1 || body.length < 10)
                return console.log("[LOG] Request Failed");
            let responseData = body.split('#');
            let metaData = responseData[3].split(':');
            let rateChannel = bot.channels.cache.get(botconfig.rateLogs.rateChannel);
            rateChannel.setTopic(`Rated Levels: ${metaData[0]}`);
            if (botconfig.logs.enabled)
                logs.send(`[LOG] There are \`${metaData[0]}\` Rated Levels on the server`);
            let levels = rateChannel.topic.slice(14, rateChannel.topic.length);
            if (levels > metaData[0])
                return rateChannel.send(`${levels - metaData[0]} Levels have been unrated`);
            if (levels < metaData[0]) {
                let newLevels = metaData[0] - levels;
                let levelsArr = responseData[0].split('|');
                let loop = newLevels;
                if (newLevels >= 10) {
                    loop = 10;
                    if (newLevels == 11)
                        console.log(`Can not find the remaining ${newLevels - 10} level`);
                    else
                        console.log(`Can not find the remaining ${newLevels - 10} levels`);
                }
                if (botconfig.rateLogs.notificationsOn)
                    rateChannel.send(`<@&${botconfig.rateLogs.notificationRoleID}>`);
                for (let i = 0; i < loop; i++) {
                    let levelData = parse.parseResponse(levelsArr[i]);
                    let level = {
                        levelID: levelData[1],
                        levelName: levelData[2],
                        description: levelData[3],
                        version: levelData[5],
                        playerID: levelData[6],
                        difficulty: levelData[9],
                        download: levelData[10],
                        officialSong: levelData[12],
                        gameVersion: levelData[13],
                        likes: levelData[14],
                        length: levelData[15],
                        demon: levelData[17],
                        stars: levelData[18],
                        featured: levelData[19],
                        auto: levelData[25],
                        uploadDate: levelData[27],
                        updateDate: levelData[29],
                        copied: levelData[30],
                        twoPlayer: levelData[31],
                        customSong: levelData[35],
                        coins: levelData[37],
                        verifiedCoins: levelData[38],
                        timelyID: levelData[41],
                        epic: levelData[42],
                        demondiff: levelData[43],
                        objects: levelData[45],
                    };
                    let length = '';
                    switch (level['length']) {
                        case '0':
                            length = 'Tiny';
                            break;
                        case '1':
                            length = 'Short';
                            break;
                        case '2':
                            length = 'Medium';
                            break;
                        case '3':
                            length = 'Long';
                            break;
                        case '4':
                            length = 'XL';
                            break;
                        default:
                            length = 'Unknown';
                            break;
                    }
                    let colour;
                    let difficulty;
                    switch (level['difficulty']) { // difficulty faces
                        case '0':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['NA'];
                            colour = 0xa9a9a9;
                            break;
                        case '10':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['Easy'];
                            colour = 0x00e0ff;
                            break;
                        case '20':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['Normal'];
                            colour = 0x00ff3a;
                            break;
                        case '30':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['Hard'];
                            colour = 0xffb438;
                            break;
                        case '40':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['Harder'];
                            colour = 0xfc1f1f;
                            break;
                        case '50':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['Insane'];
                            colour = 0xf91ffc;
                            break;
                        default:
                            difficulty = levelconfig.LEVEL_DIFFICULTY['NA'];
                            colour = 0xa9a9a9;
                            break;
                    }
                    if (level['auto'] == 1) {
                        difficulty = levelconfig.LEVEL_DIFFICULTY['Auto'];
                        colour = 0xf5c96b;
                    }
                    else if (level['demon'] == 1) {
                        switch (level['demondiff']) {
                            case '3':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EasyDemon'];
                                colour = 0xaa6bf5;
                                break;
                            case '4':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['MediumDemon'];
                                colour = 0xac2974;
                                break;
                            case '5':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['InsaneDemon'];
                                colour = 0xb31548;
                                break;
                            case '6':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['ExtremeDemon'];
                                colour = 0x8e0505;
                                break;
                            default:
                                difficulty = levelconfig.LEVEL_DIFFICULTY['HardDemon'];
                                colour = 0xff0000;
                                break;
                        }
                    }
                    if (level['featured'] > 0) {
                        switch (level['difficulty']) {
                            case '0':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureNA'];
                                break;
                            case '10':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureEasy'];
                                break;
                            case '20':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureNormal'];
                                break;
                            case '30':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureHard'];
                                break;
                            case '40':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureHarder'];
                                break;
                            case '50':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureInsane'];
                                break;
                            default:
                                difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureNA'];
                                break;
                        }
                        if (level['auto'] == 1) {
                            difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureAuto'];
                        }
                        else if (level['demon'] == 1) {
                            switch (level['demondiff']) {
                                case '3':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureEasyDemon'];
                                    break;
                                case '4':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureMediumDemon'];
                                    break;
                                case '5':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureInsaneDemon'];
                                    break;
                                case '6':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureExtremeDemon'];
                                    break;
                                default:
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['FeatureHardDemon'];
                                    break;
                            }
                        }
                    }
                    if (level['epic'] > 0) {
                        switch (level['difficulty']) {
                            case '0':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicNA'];
                                break;
                            case '10':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicEasy'];
                                break;
                            case '20':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicNormal'];
                                break;
                            case '30':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicHard'];
                                break;
                            case '40':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicHarder'];
                                break;
                            case '50':
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicInsane'];
                                break;
                            default:
                                difficulty = levelconfig.LEVEL_DIFFICULTY['EpicNA'];
                                break;
                        }
                        if (level['auto'] == 1) {
                            difficulty = levelconfig.LEVEL_DIFFICULTY['EpicAuto'];
                        }
                        else if (level['demon'] == 1) {
                            switch (level['demondiff']) {
                                case '3':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['EpicEasyDemon'];
                                    break;
                                case '4':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['EpicMediumDemon'];
                                    break;
                                case '5':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['EpicInsaneDemon'];
                                    break;
                                case '6':
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['EpicExtremeDemon'];
                                    break;
                                default:
                                    difficulty = levelconfig.LEVEL_DIFFICULTY['EpicHardDemon'];
                                    break;
                            }
                        }
                    }
                    let coins;
                    switch (level['coins']) {
                        case '1':
                            coins = botconfig.emotes.userCoin;
                            break;
                        case '2':
                            coins = `${botconfig.emotes.userCoin} ${botconfig.emotes.userCoin}`;
                            break;
                        case '3':
                            coins = `${botconfig.emotes.userCoin} ${botconfig.emotes.userCoin} ${botconfig.emotes.userCoin}`;
                            break;
                        default:
                            coins = '-';
                    }
                    let likeEmote;
                    let users = responseData[1].split('|');
                    let userData = users[i].split(':');
                    level['likes'] < 0 ? likeEmote = botconfig.emotes.dislike : likeEmote = botconfig.emotes.like;
                    if (!botconfig.rateLogs.difficultyColours)
                        colour = parseInt(`0x${botconfig.setup.commandColour}`, 16);
                    //thank you stack overflow for less work
                    function random_item(items) {
                        return items[Math.floor(Math.random() * items.length)];
                    }
                    let rateMessage = random_item(botconfig.rateLogs.rateMessages);
                    const lvlEmbed = new Discord.MessageEmbed().setTitle(`__${level['levelName']}__ by __${userData[1]}__`).setColor(colour).setFooter(`LevelID: ${level['levelID']} | Objects: ${level['objects']}`)
                        .addField(`__Level Stats__`, `${botconfig.emotes.star} ${level['stars']}\n${botconfig.emotes.download} ${level['download']}\n${likeEmote} ${level['likes']}\n${botconfig.emotes.length} ${length}\n\n**Coins** ${coins}`)
                        .setThumbnail(difficulty);
                    rateChannel.send(rateMessage, lvlEmbed);
                }
            }
        });
    }, 300000);
};
