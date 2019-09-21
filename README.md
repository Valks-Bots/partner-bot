### What is Partner Bot?
Partner bot is a discord bot that uses discord-js and sqlite to automate partnerships in the big community of discord. When you bump your advertisement, the bot sends it to every guild that has the bot setup on a set cooldown.

### Test it out right now!
A prototype of the bot is hosted on heroku and has an uptime of 99%, the only disadvantage of using heroku is it resets the `database.sqlite` file every 24 hours. (If you are hosting the bot locally you will not have to worry about any files being reset.) That's why this is nothing more then just a prototype that you can simply test out! Invite the prototype to your guild(s) with the following [invite link](https://discordapp.com/api/oauth2/authorize?client_id=549301709520765019&scope=bot&permissions=8). If you have any questions or are interested in contributing, you can contact me on discord via **valk#3277**.

Have fun advertising!

### Setting up your Token
You will need to setup a token for the bot. Head over to [Discord Developers Portal](https://discordapp.com/developers/applications/) and create a new application. Under the Bot tab click "Add Bot" and copy your token from that page. Replace the token value in bot.js directly or create a new file with the name secret.json with your token value in it and simply call `secret.key`. I suggest you use the name secret.json as it's already in the `.gitignore` if you ever fork this repository.
```json
{
  "key" : "FESCDWEQojkn#ERGFBNJ3ERFSDdsawrt$ygw324dsfjytryRETGD"
}
```
Do not share your token with anyone as it will allow others to take control of your bot and all the guilds that it is in with the respective permissions it has for each guild.

### Running the Bot
Make sure you have recommended version of [NodeJS](https://nodejs.org) installed. The latest version should be fine too but you may run into problems like I have in the past. After NodeJS is installed you will need to navigate to the bot directory with command line and install the following dependencies.
```bash
npm i discord.js --save
npm i sqlite --save
```
Then navigate to the directory of the bot and run it with `node bot.js`. If you don't like always having to stop start the bot whenever you want to test code you can install nodemon with `npm i nodemon --save` and run the bot with `nodemon bot.js` to automate this process.

You do not need to worry about anything SQL related as it is all stored locally in a `database.sqlite` file.

### Using the Bot
First you will need to generate a invite link for the bot, grab the client ID from your application in the Discord Developers Portal and save it somewhere, and calculate the bot permissions under the Bot tab if you think you will need for the bot if you decide to add other features to it. Then replace where it says ID with your client id and PERMISSIONS with your permissions. If you are unfamiliar with bot links, you can read more about it [here](https://discordapp.com/developers/docs/topics/oauth2#bot-authorization-flow-url-example).
```yml
https://discordapp.com/api/oauth2/authorize?client_id=ID&scope=bot&permissions=PERMISSIONS
```
Invite the bot to at least 2 unique discords. Go to any channel the bot is allowed to write and read messages. Type `init <channel>` where you want your channel to send and receive guild advertisements. Then create a description for your advertisement with `desc <description>`. When setting your description the bot will not allow you to include `@everyone`, `@here` or anything starting with `http`. You do not need to include a invite to your discord in your description, the bot will automatically do this for you. You can preview your description with `preview` and finally you can `bump` your advertisement every 300 seconds by default. You will find that the bot will send your advertisement to every guild the bot is in.
