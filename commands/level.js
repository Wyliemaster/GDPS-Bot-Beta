const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const levelconfig = require("../levelconfig.json");
const request = require('request');
const parse = require(`./../lib/parse.js`);
// i can already tell this is gonna be much spaghetti before starting
module.exports.run = async (bot, message, args) => {
    if (!args[0] || args[0] == ' ')
        return message.reply(`Command Usage: ${botconfig.setup.prefix}level <levelID || levelName>`);
    let isID = false;
    if (!isNaN(args[0]))
        isID = true;
    if (isID) {
        request.post(`http://${botconfig.setup.server}/downloadGJLevel22.php`, {
            form: {
                levelID: args[0],
                secret: "Wmdf2893gb7"
            }
        }, function callback(err, httpResponse, body) {
            if (err)
                return console.log(err);
            if (body == -1)
                return message.channel.send(`\`${args[0]} can not be found\``);
            let levelInfo = body.split('#');
            let levelData = parse.parseResponse(levelInfo[0]);
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
            if (level['epic'] == 1) {
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
            if (level['epic'] == 2) {
                switch (level['difficulty']) {
                    case '0':
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryNA'];
                        break;
                    case '10':
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryEasy'];
                        break;
                    case '20':
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryNormal'];
                        break;
                    case '30':
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryHard'];
                        break;
                    case '40':
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryHarder'];
                        break;
                    case '50':
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryInsane'];
                        break;
                    default:
                        difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryNA'];
                        break;
                }
                if (level['auto'] == 1) {
                    difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryAuto'];
                }
                else if (level['demon'] == 1) {
                    switch (level['demondiff']) {
                        case '3':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryEasyDemon'];
                            break;
                        case '4':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryMediumDemon'];
                            break;
                        case '5':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryInsaneDemon'];
                            break;
                        case '6':
                            difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryExtremeDemon'];
                            break;
                        default:
                            difficulty = levelconfig.LEVEL_DIFFICULTY['LegendaryHardDemon'];
                            break;
                    }
                }
            }
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
            level['likes'] < 0 ? likeEmote = botconfig.emotes.dislike : likeEmote = botconfig.emotes.like;
            if (!botconfig.rateLogs.difficultyColours)
                colour = parseInt(`0x${botconfig.setup.commandColour}`, 16);
            let userData = levelInfo[3].split(':');
            let name;
            userData.length == 3 ? name = `by __${userData[1]}__` : name = '';
            const lvlEmbed = new Discord.MessageEmbed().setTitle(`__${level['levelName']}__ ${name}`).setColor(colour).setFooter(`LevelID: ${level['levelID']} | Objects: ${level['objects']}`)
                .addField(`__Level Stats__`, `${botconfig.emotes.star} ${level['stars']}\n${botconfig.emotes.download} ${level['download']}\n${likeEmote} ${level['likes']}\n${botconfig.emotes.length} ${length}\n\n**Coins** ${coins}`)
                .setThumbnail(difficulty);
            message.channel.send(lvlEmbed);
        });
    }
    else {
        // message.channel.send(`name search yet to be implemented`)
        let cmdsplit = (message.content).split(' ')[0];
        let underscore = message.content.replace(/ /g, '_');
        let level = underscore.split(cmdsplit + '_')[1];
        request.post(`http://${botconfig.setup.server}/getGJLevels21.php`, {
            form: {
                gameVersion: 21,
                binaryVersion: 35,
                str: level,
                secret: "Wmdf2893gb7"
            }
        }, function callback(err, httpResponse, body) {
            let levelArr = [];
            let data = body.split('#');
            let creators = data[1];
            let songs = data[2];
            let metaData = data[3];
            let hash = data[4];
            console.log(`data[1]: ${data[1]}`);
            console.log(`data[2]: ${data[2]}`);
            console.log(`data[3]: ${data[3]}`);
            console.log(`data[4]: ${data[4]}`);
            metaData = metaData.split(':');
            if (metaData[0] == 0)
                return message.channel.send('No levels could be found');
            if (data[0].includes('|'))
                levelArr = data[0].split('|');
            else
                levelArr.push(data[0]);
            level = level.replace(/_/g, ' ');
            let creator = creators.split('|');
            const lvl = new Discord.MessageEmbed().setColor(`0x${botconfig.setup.commandColour}`).setTitle(`Search results for __${level}__`).setFooter(`${levelArr.length} levels out of ${data[3].split(':')[0]} results`);
            for (let i = 0; i < levelArr.length; i++) {
                let levelData = parse.parseResponse(levelArr[i]);
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
                level['likes'] < 0 ? likeEmote = botconfig.emotes.dislike : likeEmote = botconfig.emotes.like;
                let diffEmote;
                if (level['stars'] == 0)
                    diffEmote = botconfig.emotes.unrated;
                else
                    diffEmote = botconfig.emotes.rated;
                if (level['featured'] != 0)
                    diffEmote = botconfig.emotes.featured;
                if (level['epic'] == 1)
                    diffEmote = botconfig.emotes.epic;
                let lvlcreator = creator[i].split(':');
                lvl.addField(`${diffEmote} __${level['levelName']}__ by __${lvlcreator[1]}__`, `${botconfig.emotes.star} ${level['stars']} ${botconfig.emotes.download} ${level['download']} ${likeEmote} ${level['likes']} ${botconfig.emotes.length} ${length}\nlevel ID: \`${level['levelID']}\``);
            }
            message.channel.send(lvl);
        });
    }
};
module.exports.config = {
    name: "level",
    description: "checks if server is online",
    usage: `${botconfig.setup.prefix}ping`,
    accessableby: "Members",
    aliases: ['lvl']
};
