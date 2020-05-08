<!--Hello, super secret comment right here-->
![Preview](https://i.gyazo.com/6fe2e372a70364f9cee3d2a96af1ddaf.png)

[![Quality Gate Status][quality]][quality-url]
[![Lines of Code][lines]][lines-url]
[![Bugs][bugs]][bugs-url]
[![GitHub license][license]][license-url]
[![Issues][issues]][issues-url]
[![Discord][discord]][discord-url]
[![GitHub stars][stars]][stars-url]
[![GitHub forks][forks]][forks-url]

<h1>partnerbot</h1>
Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup with a configurable cooldown.

## Table of Contents
1. [Install](#install)
2. [Documentation](#documentation)
3. [Contributing](#contributing)
4. [Support](#support)

<h2 align="center">Install</h2>

**Note that this project was designed to run on local Windows systems.**
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Run `npm install` in the project root directory
4. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
5. Create a `.env` file in the `src` folder with the following content inside (`BOT_TOKEN=BotTokenHere`)
6. Start server with `node dev:server`
7. Create an invite link for the bot by grabbing its token ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=ID&scope=bot&permissions=27681`
8. Invite the bot to at least `2` unique guilds
9. Continue setup with `t!help` (You can change the prefix in the config)

<h2 align="center">Documentation</h2>

[Link to Documentation](https://valkyrienyanko.github.io/partner-bot/)

<h2 align="center">Contributing</h2>

Read [this](https://github.com/valkyrienyanko/partner-bot/blob/master/.github/CONTRIBUTING.md) if you're interested in contributing.

<h2 align="center">Support</h2>

If you have any questions, send me a message over discord at **valk#3277**.

[quality]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[lines]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=ncloc
[lines-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[bugs]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=bugs
[bugs-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[license]: https://img.shields.io/github/license/valkyrienyanko/partner-bot?color=brightgreen
[license-url]: https://github.com/valkyrienyanko/partner-bot/blob/master/LICENSE
[issues]: https://img.shields.io/github/issues/valkyrienyanko/partner-bot
[issues-url]: https://github.com/valkyrienyanko/partner-bot/issues
[discord]: https://img.shields.io/discord/453710350454620160.svg
[discord-url]: https://discord.gg/thMupbv
[stars]: https://img.shields.io/github/stars/valkyrienyanko/partner-bot?color=brightgreen
[stars-url]: https://github.com/valkyrienyanko/partner-bot/stargazers
[forks]: https://img.shields.io/github/forks/valkyrienyanko/partner-bot?color=brightgreen
[forks-url]: https://github.com/valkyrienyanko/partner-bot/network
