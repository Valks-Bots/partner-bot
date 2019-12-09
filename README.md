# Partner Bot

## About
Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup with a configurable cooldown.

## Setup
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Install yarn `npm i -g yarn`
4. Run `yarn install`
5. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
6. Create `.env` file in root of project and put `BOT_TOKEN=YOURTOKENHERE` inside.
7. Start server with `yarn dev:server`
8. Create an invite link for the bot by grabbing its token ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=ID&scope=bot&permissions=8`
9. Invite the bot to at least 2 unique discords. 
10. Use `v!init <channel>` in the channel you want to send and receive guild advertisements.
11. Use `v!desc <description>` to create a description for your advertisement. (The bot will automatically include your discord invite link.)
12. Use `v!preview` to have a look at your advertisement.
13. Use `v!bump` to bump your advertisement. (There is a `300` second cooldown by default.)
14. Repeat steps 10-13 in the other guild.

## Contributing
See [CONTRIBUTORS.md](https://github.com/valkyrienyanko/partner-bot/blob/master/CONTRIBUTORS.md).

If you have any questions, send me a message over discord at **valk#3277**.
