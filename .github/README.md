<div align="center">

  [![Quality Gate Status][quality]][quality-url]
  [![Lines of Code][lines]][lines-url]
  [![Bugs][bugs]][bugs-url]
  [![GitHub license][license]][license-url]

</div>

<p align="center">Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. The bot sends your advert to every guild that has the bot setup with a configurable cooldown when you use the bump command. This bot has only been tested on a total of 4 servers, issues may arise if the bot has to handle 100 or more servers all sending messages between each other simultaneously. This project has been discontinued. If this bot was helpful to you consider giving me credit by <a href="https://github.com/valkyrienyanko">linking back to my GitHub profile page</a>.
  <br><br><br>
</p>

## Preview of Bump Message
![Preview](https://i.gyazo.com/6fe2e372a70364f9cee3d2a96af1ddaf.png)

## Install on Windows
1. Clone `https://github.com/valkyrienyanko/partner-bot.git`
2. Download and install `LTS` [Node.js](https://nodejs.org/en/)
3. Install yarn with `npm i -g yarn`
4. Run `yarn install` in the project root directory
5. Generate a bot token from the [Discord Developers Portal](https://discordapp.com/developers/applications/)
6. Create a `.env` file in the `src` folder with the following content inside (`BOT_TOKEN=BotTokenHere`)
7. Change `ownerID` in `config.js` to your user ID
8. Start server with `yarn start`
9. Create an invite link for the bot by grabbing its ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=YOUR_BOT_ID_HERE&scope=bot&permissions=27681`
10. Invite the bot to at least `2` unique guilds
11. Continue setup with `t!help`

## Install on Heroku
1. Create a [Heroku](https://signup.heroku.com/) account.
2. Create a new App from your [Dashboard](https://dashboard.heroku.com/new-app). 
3. Download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line). 
4. Open a terminal in your project and run `heroku login`.
5. Create a Git remote using `heroku git:remote -a <APP-NAME>`.
6. Create a file in your project called `Procfile`. (Must be in same folder as index.js)
7. Insert `worker:node index.js` to the Procfile. 
8. Commit and push using `git add .` `git commit -m "<Message>"` `git push heroku master`

## Install on Glitch
1. Create an account on https://glitch.com
2. Create new project -> import from GitHub -> `https://github.com/Valks-Bots/partner-bot`
3. Click src folder dots icon to right -> create new file -> `.env` -> put `BOT_TOKEN=BotTokenHere` inside
4. Change `ownerID` in `config.js` to your user ID
5. Go to tools -> open up Terminal -> type `npm start`
6. Create an invite link for the bot by grabbing its ID and putting it in the following URL `https://discordapp.com/api/oauth2/authorize?client_id=YOUR_BOT_ID_HERE&scope=bot&permissions=27681`
7. Invite the bot to at least `2` unique guilds
8. Continue setup with `t!help`

## FAQ
Q: How do I increase the max description limit?  
A: Edit the `max_length` config value in `src/config.js`  

Q: I am getting this error in the console "`TypeError: Cannot read property 'tag' of undefined`", what do I do?  
A: Edit the `ownerID` config value in `src/config.js` with your user ID.  

Q: Every time I restart the bot, all the information I had setup has been wiped?  
A: If you are using Heroku, Glitch or any other "free" online hosting service then it is highly likely that the service is deleting the bots database every 12 to 24 hours. If you host the bot on your local machine, you will not run into this problem.  

[quality]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[lines]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=ncloc
[lines-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[bugs]: https://sonarcloud.io/api/project_badges/measure?project=valkyrienyanko_partner-bot&metric=bugs
[bugs-url]: https://sonarcloud.io/dashboard?id=valkyrienyanko_partner-bot
[license]: https://img.shields.io/github/license/valkyrienyanko/partner-bot?color=brightgreen
[license-url]: https://github.com/valkyrienyanko/partner-bot/blob/master/LICENSE
