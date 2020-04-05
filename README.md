# Partner Bot

## About
Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup with a configurable cooldown.

## Setup
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Install yarn `npm i -g yarn`
4. Run `yarn install` in the project root directory (If done correctly you should notice a `.env` file in your bot directory)
5. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
6. Update the `.env` file with your bot token (`BOT_TOKEN=BotTokenHere`)
7. Start server with `yarn dev:server`
8. Create an invite link for the bot by grabbing its token ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=ID&scope=bot&permissions=27649`
9. Invite the bot to at least `2` unique guilds
10. Continue setup with `v!help`

## Contributing
The bot is really messy and could be 'modular', there's obviously a lot of refactoring that could happen here.

See [CONTRIBUTING.md](https://github.com/valkyrienyanko/partner-bot/blob/master/CONTRIBUTING.md).

If you have any questions, send me a message over discord at **valk#3277**.

## Notice
I've recently found out that some cheeky individuals are publishing this bots source on third party bot sites claiming to make it their own without making any major changes to the bots source (only changing the author name to be their own). Please do not change the author name if you're going to do that. You should only change the author name if and only if you make noticable changes to the source. The changes can be as small as changing the content of every message to be your own but just changing the author and nothing else is just plain dirty. Such actions are very demotivating to me and makes me no longer want to publish future projects like this to the public.
