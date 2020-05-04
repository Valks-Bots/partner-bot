# Partner Bot

## About
Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup with a configurable cooldown.

![Preview](https://i.gyazo.com/6fe2e372a70364f9cee3d2a96af1ddaf.png)

## Setup
**Note that this project was designed to run on local Windows systems.**
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Install yarn `npm i -g yarn`
4. Run `yarn install` in the project root directory (If done correctly you should notice a `.env` file in your bot directory)
5. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
6. Create a `.env` file in the `src` folder with the following content inside (`BOT_TOKEN=BotTokenHere`)
7. Start server with `yarn dev:server`
8. Create an invite link for the bot by grabbing its token ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=ID&scope=bot&permissions=27681`
9. Invite the bot to at least `2` unique guilds
10. Continue setup with `t!help` (You can change the prefix in the config)

## Contributing
See [CONTRIBUTING.md](https://github.com/valkyrienyanko/partner-bot/blob/master/.github/CONTRIBUTING.md).

If you have any questions, send me a message over discord at **valk#3277**.
