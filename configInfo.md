# Config Info

This file is to explain what each part of [botsettings.json](/botsettings.json) does

## Setup

The Setup section are required in order to get the bot to function

| key | description |
|:----|:------------|
| Token | The bot token that you get from the [Discord Developer Portal](https://discord.com/developers/applications) |
| prefix | what you use to trigger commands for the bot for example: setting the prefix to `!` means you can call commands with `!profile` and setting the prefix to `gd?` would mean you can call commands with `gd?profile` |
| Server | The URL for the server you want the bot to fetch information from |
| customStatus | The game that the bot will be playing, [Example](https://media.discordapp.net/attachments/801840133355470888/809760190932320296/unknown.png) |
| commandColour | the [hex Colour code](https://htmlcolorcodes.com/) for the [side of embeds](https://media.discordapp.net/attachments/755460924000829460/809760764490547210/unknown.png) |
| cronEnabled | If the cron command is enabled |
| cronCooldown | a cooldown between each usage of the cron command |

## Emotes

These will be the emotes that are shown on the GDPS Bot when you use commands. you will need to post the emoteID's for each repsective emote yourself otherwise they wont load. to find the emotes then follow these steps:

- type the emote you want to add

![step1](https://cdn.discordapp.com/attachments/807260925589192705/809781120110821467/unknown.png)

- add a `\` before the emote

![step2](https://media.discordapp.net/attachments/807260925589192705/809781160053440552/unknown.png)

- send the message and you'll have the ID

![Tada!](https://media.discordapp.net/attachments/807260925589192705/809781723859910656/unknown.png)


## DevMode

Dev mod is a tool that was used during the bots creation

## rateLogs

The rate logs get recent rates happening to the server - it updates every 5 minutes 

| key | description |
|:----|:------------|
| enabled | if the rate log is enabled |
| rateChannel | The discord channelID for the place where the rates are sent |
| difficultyColours | the embeds match the colour of the difficulty faces |
| notificationsOn | if you want a pingable rate role |
| notificationRoleID | the roleID for the notification role |
| rateMessages| an array of messages that will randomly be attatched to the rate announement. to add new messages just add a `,` and add the new message within `"double quotes"`

## Logs

If you want to log the bots activities