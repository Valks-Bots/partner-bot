<div align="center">

  [![Quality Gate Status][quality]][quality-url]
  [![Lines of Code][lines]][lines-url]
  [![Bugs][bugs]][bugs-url]
  [![GitHub license][license]][license-url]
  [![Discord][discord]][discord-url]

</div>

<p align="center">Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup with a configurable cooldown.
  <br><br><br>
</p>

## Preview of Bump Message
![Preview](https://i.gyazo.com/6fe2e372a70364f9cee3d2a96af1ddaf.png)

## Install on Glitch
1. Create an account on https://glitch.com
2. Create new project -> import from GitHub -> `https://github.com/Valks-Bots/partner-bot`
3. Click src folder dots icon to right -> create new file -> `.env` -> put `BOT_TOKEN=BotTokenHere` inside
4. Go to tools -> open up Terminal -> type `npm start`
5. Create an invite link for the bot by grabbing its ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=YOUR_BOT_ID_HERE&scope=bot&permissions=27681`
6. Invite the bot to at least `2` unique guilds
7. Continue setup with `t!help`

## Install on Windows
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Install yarn with `npm i -g yarn`
4. Run `yarn install` in the project root directory
5. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
6. Create a `.env` file in the `src` folder with the following content inside (`BOT_TOKEN=BotTokenHere`)
7. Start server with `yarn start`
8. Create an invite link for the bot by grabbing its ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=YOUR_BOT_ID_HERE&scope=bot&permissions=27681`
9. Invite the bot to at least `2` unique guilds
10. Continue setup with `t!help`

[quality]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[lines]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=ncloc
[lines-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[bugs]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=bugs
[bugs-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[license]: https://img.shields.io/github/license/valkyrienyanko/partner-bot?color=brightgreen
[license-url]: https://github.com/valkyrienyanko/partner-bot/blob/master/LICENSE
[discord]: https://img.shields.io/discord/453710350454620160.svg
[discord-url]: https://discord.gg/thMupbv
