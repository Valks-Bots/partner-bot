[1mdiff --git a/.gitignore b/.gitignore[m
[1mindex 6d68b68..9d1f811 100644[m
[1m--- a/.gitignore[m
[1m+++ b/.gitignore[m
[36m@@ -1,3 +1,4 @@[m
 node_modules/[m
 package-lock.json[m
[31m-database.sqlite[m
\ No newline at end of file[m
[32m+[m[32mdatabase.sqlite[m
[32m+[m[32msecret.json[m
\ No newline at end of file[m
[1mdiff --git a/bot.js b/bot.js[m
[1mindex 039ec6e..7c3b17c 100644[m
[1m--- a/bot.js[m
[1m+++ b/bot.js[m
[36m@@ -2,215 +2,220 @@[m
 const Discord = require('discord.js');[m
 const client = new Discord.Client();[m
 const tokens = require('./tokens.json');[m
[32m+[m[32mconst secret = require('./secret.json');[m
 const sql = require('sqlite');[m
 sql.open('./database.sqlite'); // Create the database!![m
 [m
 let lastDate = [];[m
 [m
 const commands = {[m
[31m-	'help': (msg) => {[m
[31m-	  msg.channel.send({embed: {[m
[31m-			title: 'Vyla Help Central',[m
[31m-			description: `The bot was created by **valk#7218**, if you have any questions or would like to suggest new features or report bugs, please send them a direct message. All commands start with \`${tokens.prefix}\`.`,[m
[31m-			fields: [[m
[31m-			{[m
[31m-				name: 'invite',[m
[31m-				value: 'A way to invite the bot.',[m
[31m-				inline: true[m
[31m-			},[m
[31m-			{[m
[31m-				name: 'init',[m
[31m-				value: 'Initalize advertisement channel.',[m
[31m-				inline: true[m
[31m-			},[m
[31m-			{[m
[31m-				name: 'desc',[m
[31m-				value: 'Set the description of your advertisement.',[m
[31m-				inline: true[m
[31m-			},[m
[31m-			{[m
[31m-				name: 'preview',[m
[31m-				value: 'Preview your advertisement.',[m
[31m-				inline: true[m
[31m-			},[m
[31m-			{[m
[31m-				name: 'bump',[m
[31m-				value: 'Advertise your guild to everyone.',[m
[31m-				inline: true[m
[31m-			},[m
[31m-			][m
[31m-		}});[m
[31m-	},[m
[31m-	'invite': (msg) => {[m
[31m-		sendEmbed(msg, msg.guild.id, msg.channel.id, 'Bot can be invited with this [link](https://discordapp.com/oauth2/authorize?client_id=405811324187181066&scope=bot&permissions=8).');[m
[31m-	},[m
[31m-	'bump': (msg) => {[m
[31m-		const now = new Date();[m
[31m-		let cooldown = (5 * 60 * 1000);[m
[31m-		if (lastDate[msg.guild.id] === undefined){[m
[31m-			lastDate[msg.guild.id] = 0;[m
[31m-		}[m
[31m-    if (now - lastDate[msg.guild.id] > cooldown) {[m
[31m-      // It's been more than 10 mins[m
[31m-			let desc = null;[m
[31m-			sql.all('SELECT * FROM settings').then(row => {[m
[31m-				msg.guild.channels.first().createInvite().then(invite => {[m
[31m-					for (let i = 0; i < row.length; i++){[m
[31m-						let guild = client.guilds.get(row[i].guildid);[m
[31m-						[m
[31m-						for (let a = 0; a < row.length; a++){[m
[31m-							let temp = client.guilds.get(row[a].guildid);[m
[31m-							if (temp){[m
[31m-								if (temp.id === msg.guild.id){[m
[31m-									if (!msg.guild.channels.has(row[a].partner)){[m
[31m-										sendEmbed(msg, msg.guild.id, msg.channel.id, `You must first initialize a channel for the bot in ${msg.guild.name} with \`${tokens.prefix}init\`before you can bump your server.`);[m
[31m-										lastDate[msg.guild.id] = 0;[m
[31m-										return;[m
[31m-									}[m
[31m-									desc = row[a].desc;[m
[31m-									break;[m
[31m-								}[m
[31m-							}[m
[31m-						}[m
[31m-						[m
[31m-						if (desc === undefined || desc === null){[m
[31m-							lastDate[msg.guild.id] = 0;[m
[31m-							return sendEmbed(msg, msg.guild.id, msg.channel.id, `A description for ${msg.guild.name} has not been set yet. Please set one.`);[m
[31m-						}[m
[31m-						if (guild){[m
[31m-							if (guild.channels.has(row[i].partner) && guild.id !== msg.guild.id){[m
[31m-								let str = [[m
[31m-									`__**${msg.guild.name}**__`,[m
[31m-									`${desc} ${invite.url}`[m
[31m-								];[m
[31m-								guild.channels.get(row[i].partner).send(str.join('\n\n'));[m
[31m-							}[m
[31m-						}[m
[31m-					}[m
[31m-					sendEmbed(msg, msg.guild.id, msg.channel.id, `Bumped sucessfully to **${row.length - 1}** guilds.`);[m
[31m-				});[m
[31m-			});[m
[31m-      lastDate[msg.guild.id] = now;[m
[31m-    } else {[m
[31m-      // It's been less than 10 mins[m
[31m-			let remaining = Math.round(((cooldown) - (now - lastDate[msg.guild.id]))/1000);[m
[31m-			sendEmbed(msg, msg.guild.id, msg.channel.id, `You must wait **${remaining} seconds** before you can use this command again.`);[m
[32m+[m[32m    'help': (msg) => {[m
[32m+[m[32m        msg.channel.send({[m
[32m+[m[32m            embed: {[m
[32m+[m[32m                title: 'Help',[m
[32m+[m[32m                description: `The bot was created by **valk#7218**, if you have any questions or would like to suggest new features or report bugs, please send them a direct message. All commands start with \`${tokens.prefix}\`.`,[m
[32m+[m[32m                fields: [{[m
[32m+[m[32m                        name: 'invite',[m
[32m+[m[32m                        value: 'A way to invite this bot to your own guild.',[m
[32m+[m[32m                        inline: true[m
[32m+[m[32m                    },[m
[32m+[m[32m                    {[m
[32m+[m[32m                        name: 'init',[m
[32m+[m[32m                        value: 'Synchronize advertisement channel.',[m
[32m+[m[32m                        inline: true[m
[32m+[m[32m                    },[m
[32m+[m[32m                    {[m
[32m+[m[32m                        name: 'desc',[m
[32m+[m[32m                        value: 'Set the description of your advertisement.',[m
[32m+[m[32m                        inline: true[m
[32m+[m[32m                    },[m
[32m+[m[32m                    {[m
[32m+[m[32m                        name: 'preview',[m
[32m+[m[32m                        value: 'Preview your advertisement.',[m
[32m+[m[32m                        inline: true[m
[32m+[m[32m                    },[m
[32m+[m[32m                    {[m
[32m+[m[32m                        name: 'bump',[m
[32m+[m[32m                        value: 'Advertise your guild to every other guild that has the bot setup.',[m
[32m+[m[32m                        inline: true[m
[32m+[m[32m                    },[m
[32m+[m[32m                ][m
[32m+[m[32m            }[m
[32m+[m[32m        });[m
[32m+[m[32m    },[m
[32m+[m[32m    'invite': (msg) => {[m
[32m+[m[32m        sendEmbed(msg, msg.guild.id, msg.channel.id, 'Bot can be invited with this [link](https://discordapp.com/oauth2/authorize?client_id=405811324187181066&scope=bot&permissions=8).');[m
[32m+[m[32m    },[m
[32m+[m[32m    'bump': (msg) => {[m
[32m+[m[32m        const now = new Date();[m
[32m+[m[32m        let cooldown = (5 * 60 * 1000);[m
[32m+[m[32m        if (lastDate[msg.guild.id] === undefined) {[m
[32m+[m[32m            lastDate[msg.guild.id] = 0;[m
[32m+[m[32m        }[m
[32m+[m[32m        if (now - lastDate[msg.guild.id] > cooldown) {[m
[32m+[m[32m            // It's been more than 10 mins[m
[32m+[m[32m            let desc = null;[m
[32m+[m[32m            sql.all('SELECT * FROM settings').then(row => {[m
[32m+[m[32m                msg.guild.channels.first().createInvite().then(invite => {[m
[32m+[m[32m                    for (let i = 0; i < row.length; i++) {[m
[32m+[m[32m                        let guild = client.guilds.get(row[i].guildid);[m
[32m+[m
[32m+[m[32m                        for (let a = 0; a < row.length; a++) {[m
[32m+[m[32m                            let temp = client.guilds.get(row[a].guildid);[m
[32m+[m[32m                            if (temp) {[m
[32m+[m[32m                                if (temp.id === msg.guild.id) {[m
[32m+[m[32m                                    if (!msg.guild.channels.has(row[a].partner)) {[m
[32m+[m[32m                                        sendEmbed(msg, msg.guild.id, msg.channel.id, `You must first initialize a channel for the bot in ${msg.guild.name} with \`${tokens.prefix}init\`before you can bump your server.`);[m
[32m+[m[32m                                        lastDate[msg.guild.id] = 0;[m
[32m+[m[32m                                        return;[m
[32m+[m[32m                                    }[m
[32m+[m[32m                                    desc = row[a].desc;[m
[32m+[m[32m                                    break;[m
[32m+[m[32m                                }[m
[32m+[m[32m                            }[m
[32m+[m[32m                        }[m
[32m+[m
[32m+[m[32m                        if (desc === undefined || desc === null) {[m
[32m+[m[32m                            lastDate[msg.guild.id] = 0;[m
[32m+[m[32m                            return sendEmbed(msg, msg.guild.id, msg.channel.id, `A description for ${msg.guild.name} has not been set yet. Please set one.`);[m
[32m+[m[32m                        }[m
[32m+[m[32m                        if (guild) {[m
[32m+[m[32m                            if (guild.channels.has(row[i].partner) && guild.id !== msg.guild.id) {[m
[32m+[m[32m                                let str = [[m
[32m+[m[32m                                    `__**${msg.guild.name}**__`,[m
[32m+[m[32m                                    `${desc} ${invite.url}`[m
[32m+[m[32m                                ];[m
[32m+[m
[32m+[m[32m                                guild.channels.get(row[i].partner).send(str.join('\n\n'));[m
[32m+[m[32m                            }[m
[32m+[m[32m                        }[m
[32m+[m[32m                    }[m
[32m+[m[32m                    sendEmbed(msg, msg.guild.id, msg.channel.id, `Bumped sucessfully to **${row.length - 1}** guilds.`);[m
[32m+[m[32m                });[m
[32m+[m[32m            });[m
[32m+[m[32m            lastDate[msg.guild.id] = now;[m
[32m+[m[32m        } else {[m
[32m+[m[32m            // It's been less than 10 mins[m
[32m+[m[32m            let remaining = Math.round(((cooldown) - (now - lastDate[msg.guild.id])) / 1000);[m
[32m+[m[32m            sendEmbed(msg, msg.guild.id, msg.channel.id, `You must wait **${remaining} seconds** before you can use this command again.`);[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[32m    'init': (msg) => {[m
[32m+[m[32m        if (!msg.member.hasPermission('ADMINISTRATOR')) {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');[m
[32m+[m[32m        }[m
[32m+[m[32m        const args = msg.content.slice(tokens.prefix.length).trim().split(/ +/g).slice(1);[m
[32m+[m[32m        if (args[0] === undefined) {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Please specifty a channel.');[m
[32m+[m[32m        }[m
[32m+[m[32m        let channel = client.guilds.get(msg.guild.id).channels.find('name', args[0]);[m
[32m+[m[32m        if (channel) {[m
[32m+[m[32m            sql.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, msg.guild.id]);[m
[32m+[m[32m            sendEmbed(msg, msg.guild.id, msg.channel.id, 'Channel sucessfully synchronized.');[m
[32m+[m[32m        } else {[m
[32m+[m[32m            sendEmbed(msg, msg.guild.id, msg.channel.id, 'Invalid channel.');[m
[32m+[m[32m        }[m
[32m+[m[32m    },[m
[32m+[m[32m    'desc': (msg) => {[m
[32m+[m[32m        if (!msg.member.hasPermission('ADMINISTRATOR')) {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');[m
[32m+[m[32m        }[m
[32m+[m[32m        const string = msg.content.slice(tokens.prefix.length).trim().split(/ +/g).slice(1).join(' ');[m
[32m+[m[32m        if (string === undefined || string === '') {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Please specify a description.');[m
[32m+[m[32m        }[m
[32m+[m[32m        if (string.length > 255) {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description can not be more then 255 characters long.');[m
[32m+[m[32m        }[m
[32m+[m[32m        if (string.length < 30) {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description must have at least 30 characters in it.');[m
[32m+[m[32m        }[m
[32m+[m[32m        if (string.includes('http') || string.includes('@everyone') || string.includes('@here')) {[m
[32m+[m[32m            return msg.channel.send('No links or mentions in the description please.');[m
[32m+[m[32m        }[m
[32m+[m[32m        sql.run('UPDATE settings SET desc = ? WHERE guildid = ?', [string, msg.guild.id]);[m
[32m+[m[32m        sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description sucessfully updated.');[m
[32m+[m[32m    },[m
[32m+[m[32m    'preview': (msg) => {[m
[32m+[m[32m        if (!msg.member.hasPermission('ADMINISTRATOR')) {[m
[32m+[m[32m            return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');[m
[32m+[m[32m        }[m
[32m+[m[32m        sql.get('SELECT * FROM settings WHERE guildid = ?', [msg.guild.id]).then(row => {[m
[32m+[m[32m            let str = [[m
[32m+[m[32m                `__**${msg.guild.name}**__`,[m
[32m+[m[32m                `${row.desc} [Invite]`[m
[32m+[m[32m            ];[m
[32m+[m
[32m+[m[32m            msg.channel.send(str.join('\n\n'));[m
[32m+[m[32m        });[m
     }[m
[31m-	},[m
[31m-	'init': (msg) => {[m
[31m-		if (!msg.member.hasPermission('ADMINISTRATOR')){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');[m
[31m-		}[m
[31m-		const args = msg.content.slice(tokens.prefix.length).trim().split(/ +/g).slice(1);[m
[31m-		if (args[0] === undefined){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Please specifty a channel.');[m
[31m-		}[m
[31m-		let channel = client.guilds.get(msg.guild.id).channels.find('name', args[0]);[m
[31m-		if (channel){[m
[31m-			sql.run('UPDATE settings SET partner = ? WHERE guildid = ?', [channel.id, msg.guild.id]);[m
[31m-			sendEmbed(msg, msg.guild.id, msg.channel.id, 'Channel sucessfully synced.');[m
[31m-		} else {[m
[31m-			sendEmbed(msg, msg.guild.id, msg.channel.id, 'Invalid channel.');[m
[31m-		}[m
[31m-	},[m
[31m-	'desc': (msg) => {[m
[31m-		if (!msg.member.hasPermission('ADMINISTRATOR')){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');[m
[31m-		}[m
[31m-		const string = msg.content.slice(tokens.prefix.length).trim().split(/ +/g).slice(1).join(' ');[m
[31m-		if (string === undefined || string === ''){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Please specifty a description.');[m
[31m-		}[m
[31m-		if (string.length > 255){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description can not be anymore than 255 characters long.');[m
[31m-		}[m
[31m-		if (string.length < 30){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description must have at least 30 characters in it.');[m
[31m-		}[m
[31m-		if (string.includes('http') || string.includes('@everyone') || string.includes('@here')){[m
[31m-			return msg.channel.send('No links or mentions in the description please.');[m
[31m-		}[m
[31m-		sql.run('UPDATE settings SET desc = ? WHERE guildid = ?', [string, msg.guild.id]);[m
[31m-		sendEmbed(msg, msg.guild.id, msg.channel.id, 'Description updated sucessfully.');[m
[31m-	},[m
[31m-	'preview': (msg) => {[m
[31m-		if (!msg.member.hasPermission('ADMINISTRATOR')){[m
[31m-			return sendEmbed(msg, msg.guild.id, msg.channel.id, 'You need to have the administrator permission to do this.');[m
[31m-		}[m
[31m-		sql.get('SELECT * FROM settings WHERE guildid = ?', [msg.guild.id]).then(row => {[m
[31m-			let str = [[m
[31m-				`__**${msg.guild.name}**__`,[m
[31m-				`${row.desc} [Invite]`[m
[31m-			];[m
[31m-			[m
[31m-			msg.channel.send(str.join('\n\n'));[m
[31m-		});[m
[31m-	}[m
 }[m
 [m
 client.on('ready', () => {[m
[31m-	// We have connected![m
[31m-	client.user.setActivity(`${tokens.prefix}help`, {url: "https://www.twitch.tv/valkyrienyanko"});[m
[31m-  console.log(`${client.user.tag} running on ${client.guilds.size} guilds with ${client.users.size} users.`);[m
[31m-	// Create the tables if they do not exist.[m
[31m-	sql.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR)').then(() => {[m
[31m-		for (const guild of client.guilds.values()){[m
[31m-			sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id]);[m
[31m-		}[m
[31m-	});[m
[32m+[m[32m    // We have connected![m
[32m+[m[32m    client.user.setActivity(`${tokens.prefix}help`, {[m
[32m+[m[32m        url: "https://www.twitch.tv/valkyrienyanko"[m
[32m+[m[32m    });[m
[32m+[m[32m    console.log(`${client.user.tag} running on ${client.guilds.size} guilds with ${client.users.size} users.`);[m
[32m+[m[32m    // Create the tables if they do not exist.[m
[32m+[m[32m    sql.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, partner CHARACTER, desc VARCHAR)').then(() => {[m
[32m+[m[32m        for (const guild of client.guilds.values()) {[m
[32m+[m[32m            sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id]);[m
[32m+[m[32m        }[m
[32m+[m[32m    });[m
 });[m
 [m
 client.on('guildCreate', (guild) => {[m
[31m-	console.log(`I have joined the guild ${guild.name}`);[m
[31m-	sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id]);[m
[32m+[m[32m    console.log(`I have joined the guild ${guild.name}`);[m
[32m+[m[32m    sql.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id]);[m
 });[m
 [m
 client.on('guildDelete', (guild) => {[m
[31m-	console.log(`I have left the guild ${guild.name}`);[m
[31m-	sql.run('DELETE * FROM settings WHERE guildid = ?', [guild.id]);[m
[32m+[m[32m    console.log(`I have left the guild ${guild.name}`);[m
[32m+[m[32m    sql.run('DELETE * FROM settings WHERE guildid = ?', [guild.id]);[m
 });[m
 [m
 client.on('message', async msg => {[m
[31m-	// Handle the bot and channel type.[m
[31m-	if (msg.author.bot) return; // We don't want the bot reacting to itself..[m
[31m-	if (msg.channel.type !== 'text') return; // Lets focus on the use of text channels.[m
[31m-	[m
[31m-	if (msg.content.startsWith(tokens.prefix + "ping")){[m
[31m-		const m = await msg.channel.send("Ping?");[m
[31m-		m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`);[m
[31m-		return;[m
[31m-	}[m
[31m-	[m
[31m-	// Handle Commands Module[m
[31m-	if (!msg.content.startsWith(tokens.prefix)) return; // The start of commands.[m
[31m-	console.log(`[${msg.guild.name}] ${msg.author.tag} >> ${msg.content}`); // Log commands.[m
[31m-	const cmd = msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]; //Grab the command.[m
[31m-	if (commands.hasOwnProperty(cmd)){ // Check to see if commands has the command.[m
[31m-		commands[cmd](msg); // Push the cmd to the commands object.[m
[31m-	}[m
[32m+[m[32m    // Handle the bot and channel type.[m
[32m+[m[32m    if (msg.author.bot) return; // We don't want the bot reacting to itself..[m
[32m+[m[32m    if (msg.channel.type !== 'text') return; // Lets focus on the use of text channels.[m
[32m+[m
[32m+[m[32m    if (msg.content.startsWith(tokens.prefix + "ping")) {[m
[32m+[m[32m        const m = await msg.channel.send("Ping?");[m
[32m+[m[32m        m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`);[m
[32m+[m[32m        return;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    // Handle Commands Module[m
[32m+[m[32m    if (!msg.content.startsWith(tokens.prefix)) return; // The start of commands.[m
[32m+[m[32m    console.log(`[${msg.guild.name}] ${msg.author.tag} >> ${msg.content}`); // Log commands.[m
[32m+[m[32m    const cmd = msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]; //Grab the command.[m
[32m+[m[32m    if (commands.hasOwnProperty(cmd)) { // Check to see if commands has the command.[m
[32m+[m[32m        commands[cmd](msg); // Push the cmd to the commands object.[m
[32m+[m[32m    }[m
 });[m
 [m
[31m-function sendEmbed(msg, guildid, channelid, str){[m
[31m-	const embed_object = {[m
[31m-		embed: {[m
[31m-			description: str,[m
[31m-			color: 0xffc4f9[m
[31m-		}[m
[31m-	}[m
[31m-	[m
[31m-	if (!msg.channel.permissionsFor(client.user).has('EMBED_LINKS')){[m
[31m-		return msg.channel.send('I need the embed links permission.');[m
[31m-	}[m
[31m-	[m
[31m-	if (!msg.channel.permissionsFor(client.user).has('MANAGE_MESSAGES')){[m
[31m-		return msg.channel.send('I need manage messages permission.');[m
[31m-	}[m
[31m-	[m
[31m-	let guild = client.guilds.get(guildid);[m
[31m-	[m
[31m-	guild.channels.get(channelid).send(embed_object).then(m => {[m
[31m-		[m
[31m-	});[m
[32m+[m[32mfunction sendEmbed(msg, guildid, channelid, str) {[m
[32m+[m[32m    const embed_object = {[m
[32m+[m[32m        embed: {[m
[32m+[m[32m            description: str,[m
[32m+[m[32m            color: 0xffc4f9[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    if (!msg.channel.permissionsFor(client.user).has('EMBED_LINKS')) {[m
[32m+[m[32m        return msg.channel.send('I need the embed links permission.');[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    if (!msg.channel.permissionsFor(client.user).has('MANAGE_MESSAGES')) {[m
[32m+[m[32m        return msg.channel.send('I need manage messages permission.');[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    let guild = client.guilds.get(guildid);[m
[32m+[m
[32m+[m[32m    guild.channels.get(channelid).send(embed_object).then(m => {[m
[32m+[m
[32m+[m[32m    });[m
 }[m
 [m
[31m-client.login(process.env.BOT_TOKEN);[m
\ No newline at end of file[m
[32m+[m[32mclient.login(secret.key);[m
\ No newline at end of file[m
[1mdiff --git a/package.json b/package.json[m
[1mindex e52cd58..cbd5d70 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -9,7 +9,7 @@[m
   "author": "valkyrienyanko",[m
   "license": "ISC",[m
   "dependencies": {[m
[31m-    "discord.js": "^11.3.0",[m
[31m-    "sqlite": "^2.9.0"[m
[32m+[m[32m    "discord.js": "^11.5.1",[m
[32m+[m[32m    "sqlite": "^2.9.3"[m
   }[m
 }[m
