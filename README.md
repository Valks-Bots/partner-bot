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
9. Invite the bot to at least 2 unique discords. Go to any channel the bot is allowed to write and read messages in. Type `v!init <channel>` where you want your channel to send and receive guild advertisements. Then create a description for your advertisement with `v!desc <description>`. When setting your description the bot will not allow you to include `@everyone`, `@here` or anything starting with `http`. You do not need to include a invite to your discord in your description, the bot will automatically do this for you. You can preview your description with `v!preview` and finally you can `v!bump` your advertisement every `300` seconds by default. You will find that the bot will send your advertisement to every guild the bot is setup in.

## Contributing
If you have any questions, send me a message over discord at **valk#3277**.