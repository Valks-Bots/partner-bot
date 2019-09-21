// Stable Release
const Discord = require('discord.js');
const client = new Discord.Client();
const tokens = require('./tokens.json');
const secret = require('./secret.json');
const sql = require('sqlite');
sql.open('./database.sqlite'); // Create the database!!

const DESC_MIN_LENGTH = 30;
const DESC_MAX_LENGTH = 255;

let lastDate = [];

const commands = {
    'help': (msg) => {
        msg.channel.send({
            embed: {
                title: 'Help',
                description: `The bot was created by **valk#7218**, if you have any questions or would like to suggest new features or report bugs, please send them a direct message. All commands start with \`${tokens.prefix}\`.`,
                fields: [{
                        name: 'invite',
                        value: 'A way to invite this bot to your own guild.',
                        inline: true
                    },
                    {
                        name: 'init',
                        value: 'Synchronize advertisement channel.',
                        inline: true
                    },
                    {
                        name: 'desc',
                        value: 'Set the description of your advertisement.',
                        inline: true
                    },
                    {
                        name: 'preview',
                        value: 'Preview your advertisement.',
                        inline: true
                    },
                    {
                        name: 'bump',
                        value: 'Advertise your guild to every other guild that has the bot setup.',
                        inline: true
                    },
                ]
            }
        });
    },
    'invite': (msg) => {
        sendEmbed(msg, msg.guild.id, msg.channel.id, 'Bot can be invited with this [link](https://discordapp.com/oauth2/authorize?client_id=405811324187181066&scope=bot&permissions=8).');
    },
    'bump': (msg) => {
        const ignoreCooldown = false;
        const now = new Date();
        let cooldown = (5 * 60 * 1000);
        if (lastDate[msg.guild.id] === undefined) {
            lastDate[msg.guild.id] = 0;
        }
        if (now - lastDate[msg.guild.id] > cooldown || ignoreCooldown) {
            // It's been more than 10 mins
            let desc = null;
            sql.all('SELECT * FROM settings').then(row => {
                msg.guild.fetchInvites().then(invites => {
                    if (invites.size > 0) {
                        const invite = invites.first();

                        bumpLogic(msg, row, invite);
                    } else {
                        // Create invite.
                        let channelID;
                        let channels = msg.guild.channels;
                        for (let c of channels) {
                            let channelType = c[1].type;
                            if (channelType === "text") {
                                channelID = c[0];
                                break;
                            }
                        }

                        let channel = channels.get(msg.guild.systemChannelID || channelID);
                        channel.createInvite().then(invite => {
                            bumpLogic(msg, row, invite);
                        });
                    }
                });
            });
            lastDate[msg.guild.id] = now;
        } else {
            // It's been less than 10 mins
            let remaining = Math.round(((cooldown) - (now - lastDate[msg.guild.id])) / 1000);
            sendEmbed(msg, msg.guild.id, msg.channel.id, `You must wait **${remaining} seconds** before you can use this command again.`);
        }
    },
    'init': (msg) => {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');
        }
        const args = msg.content.slice(tokens.prefix.length).trim().split(/ +/g).slice(1);
        if (args[0] === undefined) {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Please specifty a channel.');
        }
        let channel = client.guilds.get(msg.guild.id).channels.find('name', args[0]);
        if (channel) {
            sql.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, msg.guild.id]);
            sendEmbed(msg, msg.guild.id, msg.channel.id, 'Channel sucessfully synchronized.');
        } else {
            sendEmbed(msg, msg.guild.id, msg.channel.id, 'Invalid channel.');
        }
    },
    'desc': (msg) => {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');
        }
        const string = msg.content.slice(tokens.prefix.length).trim().split(/ +/g).slice(1).join(' ');
        if (string === undefined || string === '') {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Please specify a description.');
        }
		
        if (string.length > DESC_MAX_LENGTH) {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, `Description can not be more then ${DESC_MAX_LENGTH} characters long.`);
        }
        if (string.length < DESC_MIN_LENGTH) {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, `Description must have at least ${DESC_MIN_LENGTH} characters in it.`);
        }
        if (string.includes('http') || string.includes('@everyone') || string.includes('@here')) {
            return msg.channel.send('No links or mentions in the description please.');
        }
        sql.run('UPDATE settings SET desc = ? WHERE guildid = ?', [string, msg.guild.id]);
        sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description sucessfully updated.');
    },
    'preview': (msg) => {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');
        }
        sql.get('SELECT * FROM settings WHERE guildid = ?', [msg.guild.id]).then(row => {
            let str = [
                `__**${msg.guild.name}**__`,
                `${row.desc} [Invite]`
            ];

            msg.channel.send(str.join('\n\n'));
        });
    }
}

client.on('ready', () => {
    // We have connected!
    client.user.setActivity(`${tokens.prefix}help`, {
        url: "https://www.twitch.tv/valkyrienyanko"
    });
    console.log(`${client.user.tag} running on ${client.guilds.size} guilds with ${client.users.size} users.`);
    // Create the tables if they do not exist.
    sql.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR)').then(() => {
        for (const guild of client.guilds.values()) {
            sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id]);
        }
    });
});

client.on('guildCreate', (guild) => {
    console.log(`I have joined the guild ${guild.name}`);
    sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id]);
});

client.on('guildDelete', (guild) => {
    console.log(`I have left the guild ${guild.name}`);
    sql.run('DELETE * FROM settings WHERE guildid = ?', [guild.id]);
});

client.on('message', async msg => {
    // Handle the bot and channel type.
    if (msg.author.bot) return; // We don't want the bot reacting to itself..
    if (msg.channel.type !== 'text') return; // Lets focus on the use of text channels.

    if (msg.content.startsWith(tokens.prefix + "ping")) {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`);
        return;
    }

    // Handle Commands Module
    if (!msg.content.startsWith(tokens.prefix)) return; // The start of commands.
    console.log(`[${msg.guild.name}] ${msg.author.tag} >> ${msg.content}`); // Log commands.
    const cmd = msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]; //Grab the command.
    if (commands.hasOwnProperty(cmd)) { // Check to see if commands has the command.
        commands[cmd](msg); // Push the cmd to the commands object.
    }
});

function bumpLogic(msg, row, invite) {
    for (let i = 0; i < row.length; i++) {
        let guild = client.guilds.get(row[i].guildid);

        for (let a = 0; a < row.length; a++) {
            let temp = client.guilds.get(row[a].guildid);
            if (temp) {
                if (temp.id === msg.guild.id) {
                    if (!msg.guild.channels.has(row[a].partner)) {
                        sendEmbed(msg, msg.guild.id, msg.channel.id, `You must first initialize a channel for the bot in ${msg.guild.name} with \`${tokens.prefix}init\`before you can bump your server.`);
                        lastDate[msg.guild.id] = 0;
                        return;
                    }
                    desc = row[a].desc;
                    break;
                }
            }
        }

        if (desc === undefined || desc === null) {
            lastDate[msg.guild.id] = 0;
            return sendEmbed(msg, msg.guild.id, msg.channel.id, `A description for ${msg.guild.name} has not been set yet. Please set one.`);
        }
        if (guild) {
            if (guild.channels.has(row[i].partner) && guild.id !== msg.guild.id) {
                let str = [
                    `__**${msg.guild.name}**__`,
                    `${desc} ${invite.url}`
                ];

                guild.channels.get(row[i].partner).send(str.join('\n\n'));
            }
        }
    }
    sendEmbed(msg, msg.guild.id, msg.channel.id, `Bumped sucessfully to **${row.length - 1}** guilds.`);
}

function sendEmbed(msg, guildid, channelid, str) {
    const embed_object = {
        embed: {
            description: str,
            color: 0xffc4f9
        }
    }

    if (!msg.channel.permissionsFor(client.user).has('EMBED_LINKS')) {
        return msg.channel.send('I need the embed links permission.');
    }

    if (!msg.channel.permissionsFor(client.user).has('MANAGE_MESSAGES')) {
        return msg.channel.send('I need manage messages permission.');
    }

    let guild = client.guilds.get(guildid);

    guild.channels.get(channelid).send(embed_object).then(m => {

    });
}

client.login(secret.key);