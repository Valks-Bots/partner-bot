# Partner Bot

## About
Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup with a configurable cooldown.

## Setup
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Install yarn `npm i -g yarn`
4. Run `yarn install` in the project root directory
5. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
6. Update `.env` with your bot token
7. Start server with `yarn dev:server`
8. Create an invite link for the bot by grabbing its token ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=ID&scope=bot&permissions=27649`
9. Invite the bot to at least `2` unique guilds
10. Continue setup with `v!help`

## Contributing
See [CONTRIBUTORS.md](https://github.com/valkyrienyanko/partner-bot/blob/master/CONTRIBUTORS.md).

If you have any questions, send me a message over discord at **valk#3277**.
