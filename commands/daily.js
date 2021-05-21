const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
const parse = require(`${__dirname}/../lib/parse.js`);
const LEVEL_DIFFICULTY = {
    NA: 'https://media.discordapp.net/attachments/753349180885565481/781979485729194004/NA.png',
    Auto: 'https://media.discordapp.net/attachments/753349180885565481/781979850093232168/auto.png',
    Easy: 'https://media.discordapp.net/attachments/753349180885565481/781979805351804938/Easy.png',
    Normal: 'https://media.discordapp.net/attachments/753349180885565481/781982183648395264/Normal.png',
    Hard: 'https://media.discordapp.net/attachments/753349180885565481/781982140866625596/Hard.png',
    Harder: 'https://media.discordapp.net/attachments/753349180885565481/781982184834727986/Harder.png',
    Insane: 'https://media.discordapp.net/attachments/753349180885565481/781982178488877056/Insane.png',
    EasyDemon: 'https://media.discordapp.net/attachments/753349180885565481/781981543044218911/easyDemon.png',
    MediumDemon: 'https://media.discordapp.net/attachments/753349180885565481/781981789744922624/mediumDemon.png',
    HardDemon: 'https://media.discordapp.net/attachments/753349180885565481/781981292643352606/hardDemon.png',
    InsaneDemon: 'https://media.discordapp.net/attachments/753349180885565481/781981807209087017/insaneDemon.png',
    ExtremeDemon: 'https://media.discordapp.net/attachments/695600063652560976/781982171724382230/Extreme_Demon.png',
    FeatureNA: 'https://media.discordapp.net/attachments/753349180885565481/782663025697357824/naFeature.png',
    FeatureAuto: 'https://media.discordapp.net/attachments/753349180885565481/782665584315072523/autoFeature.png',
    FeatureEasy: 'https://media.discordapp.net/attachments/753349180885565481/782665587737493534/easyFeature.png',
    FeatureNormal: 'https://media.discordapp.net/attachments/753349180885565481/782665716410220594/normalFeature.png',
    FeatureHard: 'https://media.discordapp.net/attachments/753349180885565481/782665592582701066/hardFeature.png',
    FeatureHarder: 'https://media.discordapp.net/attachments/753349180885565481/782665591164764180/harderFeature.png',
    FeatureInsane: 'https://media.discordapp.net/attachments/753349180885565481/782665595753332736/insaneFeature.png',
    FeatureEasyDemon: 'https://media.discordapp.net/attachments/753349180885565481/782665589306294292/eDemonFeature.png',
    FeatureMediumDemon: 'https://media.discordapp.net/attachments/753349180885565481/782665715059916840/mDemonFeature.png',
    FeatureHardDemon: 'https://media.discordapp.net/attachments/753349180885565481/782665585246994442/DemonFeature.png',
    FeatureInsaneDemon: 'https://media.discordapp.net/attachments/753349180885565481/782665594708951070/iDemonFeature.png',
    FeatureExtremeDemon: 'https://media.discordapp.net/attachments/753349180885565481/782665588983464006/exDemonFeature.png',
    EpicNA: 'https://media.discordapp.net/attachments/753349180885565481/782668848967974932/naEpic.png',
    EpicAuto: 'https://media.discordapp.net/attachments/753349180885565481/782668777153626112/autoEpic.png',
    EpicEasy: 'https://media.discordapp.net/attachments/753349180885565481/782668780522176572/easyEpic.png',
    EpicNormal: 'https://media.discordapp.net/attachments/753349180885565481/782668850675056640/normalEpic.png',
    EpicHard: 'https://media.discordapp.net/attachments/753349180885565481/782668789367963658/hardEpic.png',
    EpicHarder: 'https://media.discordapp.net/attachments/753349180885565481/782668791648616508/harderEpic.png',
    EpicInsane: 'https://media.discordapp.net/attachments/753349180885565481/782668796036775966/insaneEpic.png',
    EpicEasyDemon: 'https://media.discordapp.net/attachments/753349180885565481/782668782924464148/eDemonEpic.png',
    EpicMediumDemon: 'https://media.discordapp.net/attachments/753349180885565481/782668846892056576/mDemonEpic.png',
    EpicHardDemon: 'https://media.discordapp.net/attachments/753349180885565481/782668778655449128/demonEpic.png',
    EpicInsaneDemon: 'https://media.discordapp.net/attachments/753349180885565481/782668793981173760/iDemonEpic.png',
    EpicExtremeDemon: 'https://media.discordapp.net/attachments/753349180885565481/782668785101307924/exDemonEpic.png'
};
module.exports.run = async (bot, message, args) => {
    let ID = -1;
    if (message.content == `${botconfig.setup.prefix}weekly`)
        ID = -2;
    request.post(`http://${botconfig.setup.server}/downloadGJLevel22.php`, {
        form: {
            levelID: ID,
            secret: "Wmdf2893gb7"
        }
    }, function callback(err, httpResponse, body) {
        let data = body.split('#');
        let levelData = parse.parseResponse(data[0]);
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
        let difficulty = '';
        switch (level['difficulty']) { // difficulty faces
            case '0':
                difficulty = LEVEL_DIFFICULTY['NA'];
                break;
            case '10':
                difficulty = LEVEL_DIFFICULTY['Easy'];
                break;
            case '20':
                difficulty = LEVEL_DIFFICULTY['Normal'];
                break;
            case '30':
                difficulty = LEVEL_DIFFICULTY['Hard'];
                break;
            case '40':
                difficulty = LEVEL_DIFFICULTY['Harder'];
                break;
            case '50':
                difficulty = LEVEL_DIFFICULTY['Insane'];
                break;
            default:
                difficulty = LEVEL_DIFFICULTY['NA'];
                break;
        }
        if (level['auto'] == 1) {
            difficulty = LEVEL_DIFFICULTY['Auto'];
        }
        else if (level['demon'] == 1) {
            switch (level['demondiff']) {
                case '3':
                    difficulty = LEVEL_DIFFICULTY['EasyDemon'];
                    break;
                case '4':
                    difficulty = LEVEL_DIFFICULTY['MediumDemon'];
                    break;
                case '5':
                    difficulty = LEVEL_DIFFICULTY['InsaneDemon'];
                    break;
                case '6':
                    difficulty = LEVEL_DIFFICULTY['ExtremeDemon'];
                    break;
                default:
                    difficulty = LEVEL_DIFFICULTY['HardDemon'];
                    break;
            }
        }
        if (level['featured'] > 0) {
            switch (level['difficulty']) {
                case '0':
                    difficulty = LEVEL_DIFFICULTY['FeatureNA'];
                    break;
                case '10':
                    difficulty = LEVEL_DIFFICULTY['FeatureEasy'];
                    break;
                case '20':
                    difficulty = LEVEL_DIFFICULTY['FeatureNormal'];
                    break;
                case '30':
                    difficulty = LEVEL_DIFFICULTY['FeatureHard'];
                    break;
                case '40':
                    difficulty = LEVEL_DIFFICULTY['FeatureHarder'];
                    break;
                case '50':
                    difficulty = LEVEL_DIFFICULTY['FeatureInsane'];
                    break;
                default:
                    difficulty = LEVEL_DIFFICULTY['FeatureNA'];
                    break;
            }
            if (level['auto'] == 1) {
                difficulty = LEVEL_DIFFICULTY['FeatureAuto'];
            }
            else if (level['demon'] == 1) {
                switch (level['demondiff']) {
                    case '3':
                        difficulty = LEVEL_DIFFICULTY['FeatureEasyDemon'];
                        break;
                    case '4':
                        difficulty = LEVEL_DIFFICULTY['FeatureMediumDemon'];
                        break;
                    case '5':
                        difficulty = LEVEL_DIFFICULTY['FeatureInsaneDemon'];
                        break;
                    case '6':
                        difficulty = LEVEL_DIFFICULTY['FeatureExtremeDemon'];
                        break;
                    default:
                        difficulty = LEVEL_DIFFICULTY['FeatureHardDemon'];
                        break;
                }
            }
        }
        if (level['epic'] > 0) {
            switch (level['difficulty']) {
                case '0':
                    difficulty = LEVEL_DIFFICULTY['EpicNA'];
                    break;
                case '10':
                    difficulty = LEVEL_DIFFICULTY['EpicEasy'];
                    break;
                case '20':
                    difficulty = LEVEL_DIFFICULTY['EpicNormal'];
                    break;
                case '30':
                    difficulty = LEVEL_DIFFICULTY['EpicHard'];
                    break;
                case '40':
                    difficulty = LEVEL_DIFFICULTY['EpicHarder'];
                    break;
                case '50':
                    difficulty = LEVEL_DIFFICULTY['EpicInsane'];
                    break;
                default:
                    difficulty = LEVEL_DIFFICULTY['EpicNA'];
                    break;
            }
            if (level['auto'] == 1) {
                difficulty = LEVEL_DIFFICULTY['EpicAuto'];
            }
            else if (level['demon'] == 1) {
                switch (level['demondiff']) {
                    case '3':
                        difficulty = LEVEL_DIFFICULTY['EpicEasyDemon'];
                        break;
                    case '4':
                        difficulty = LEVEL_DIFFICULTY['EpicMediumDemon'];
                        break;
                    case '5':
                        difficulty = LEVEL_DIFFICULTY['EpicInsaneDemon'];
                        break;
                    case '6':
                        difficulty = LEVEL_DIFFICULTY['EpicExtremeDemon'];
                        break;
                    default:
                        difficulty = LEVEL_DIFFICULTY['EpicHardDemon'];
                        break;
                }
            }
        }
        let user = data[3].split(':');
        let likeEmote;
        level['likes'] < 0 ? likeEmote = botconfig.emotes.dislike : likeEmote = botconfig.emotes.like;
        const lvlEmbed = new Discord.MessageEmbed().setTitle(`__${level['levelName']}__ by __${user[1]}__`).setColor(`0x${botconfig.setup.commandColour}`).setFooter(`LevelID: ${level['levelID']} | DailyID: ${level['timelyID']} | Objects: ${level['objects']}`)
            .addField(`__Level Stats__`, `${botconfig.emotes.download} ${level['download']}\n${botconfig.emotes.star} ${level['stars']}\n${likeEmote} ${level['likes']}\n${botconfig.emotes.length} ${length}`)
            .setThumbnail(difficulty);
        message.channel.send(lvlEmbed);
    });
};
module.exports.config = {
    name: "daily",
    description: "gets the daily level",
    usage: `${botconfig.setup.prefix}daily`,
    accessableby: "Members",
    aliases: ['weekly']
};
