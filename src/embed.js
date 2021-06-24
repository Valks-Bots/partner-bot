const Discord = require('discord.js')
const { MessageEmbed, MessageCollector } = require('discord.js')

module.exports = {
    name: "embed",
    aliases: ['make'],
    permissions: ["ADMINISTRATOR"],
    description: "make embed",

    async execute(client, message,  args, Discord){
        // let title = args[0] // args[0] is the first word or number after the command name
        // let color = args[1] 
        // let description = args.slice(2).join(" ") // args.slice(2).join(" ") means we're taking all the arguments including and after the second argument. An argument is just a word or number.
        // const error = new Discord.MessageEmbed() 
        // .setColor('#93BFE6')
        // .setTitle('**<:gears:819943211530977350> Invalid args**')
        // .setDescription('<:info:821779298952151050> please make sure to type title(one word), color(hex code or basic colors in caps), description(embed body))')

        // if(!title) return message.channel.send(error) // ! means no, so if there's no title, return and send the error embed
        // if(!color) return message.channel.send(error)
        // if(!description) return message.channel.send(error)


        // const embed = new Discord.MessageEmbed()
        // .setTitle(`**${title}**`)
        // .setColor(color)
        // .setDescription(description)
        // message.delete() // this deletes the command

        // message.channel.send(embed)

    //     const tEmbed = new MessageEmbed()
    //     .setDescription('embed description')
    //     .setColor('RED');
    // let tMsg = await message.channel.send(tEmbed);

    // const tFilter = m => m.author.id === message.author.id;
    // const oneCollector = new MessageCollector(message.channel, tFilter, { max: 2 });


    // let Title;


    // oneCollector.on('collect', async msg => {
    //     Title = msg.content
        // const firstEmbed = new MessageEmbed()
        // .setDescription('embed description')
        // .setColor('RED');
    let firstMsg = await message.channel.send('embed description');

    const firstFilter = m => m.author.id === message.author.id;
    const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 2 });

    let embedDescription;

    firstCollector.on('collect', async msg => {
        embedDescription = msg.content;
        // const secondEmbed = new MessageEmbed()
            
        //     .setDescription('mention a channel')
        //     .setColor('YELLOW');
        msg.channel.send('mention a channel');
        firstCollector.stop();

        const secondFilter = m => m.author.id === message.author.id;
        const secondCollector = new MessageCollector(message.channel, secondFilter, { max: 1 });

        secondCollector.on('collect', async msg => {
            let embedChannel = msg.mentions.channels.first();
            if (!embedChannel) {
                msg.channel.send('try again');
                secondCollector.stop();
                return;
                
            }

            // const fourthEmbed = new MessageEmbed()
            // .setDescription('done')
            // .setColor('BLUE');
        await msg.channel.send('done');
     //   thirdCollector.stop();

            await creatembed(embedDescription, embedChannel)
        })

    })

// })

async function creatembed(embedDescription, embedChannel) {

    const sendEmbed = new MessageEmbed()
   // .setTitle(''Title'')
    .setDescription(embedDescription)
    .setColor('RANDOM');

let msg = await embedChannel.send(sendEmbed);
}
    }
}