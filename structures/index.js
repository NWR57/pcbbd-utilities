const Discord = require("discord.js");
const colors = require("colors");

const client = new Discord.Client({
    fetchAllMembers: false,
    restTimeOffset: 0,
    failIfNotExists: false,
    shards: 'auto',
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ],
    presence: {
        activities: [{
            name: `${process.env.PREFIX}help`,
            type: "LISTENING",
        }],
        status: "online"
    }
});

client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

console.log(`${`Starting The Handlers`.brightGreen}`);
["extraEvents", "clientVariables", "errorHandler", "eventHandler", "commandHandler", "slashCommandHandler","keepAlive"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

// client.on("guildMemberAdd", async(member) =>{
// const Canvas = require("canvas");
// const background = "https://i.imgur.com/dqIkmCH.png"
// const { registerFont, createCanvas } = require('canvas')

// registerFont('./structures/assets/fonts/drivecorps.ttf', { family: 'font' })
//     const dim = {
//       height: 675,
//       width: 1200,
//       margin: 50
//     }

//     const av = {
//       size: 256,
//       x: 480,
//       y: 170
//     }

//     const generateImage = async (member) => {
//       let userTag = member.user.tag
//       let memberCount = member.guild.memberCount
//       let username = member.user.username
//       let discrim = member.user.discriminator
//       let avatarURL = member.user.displayAvatarURL({ format: "png", dynamic: false, size: av.size })

//       const canvas = Canvas.createCanvas(dim.width, dim.height)
//       const ctx = canvas.getContext("2d")

//       // draw in the background
//       const backimg = await Canvas.loadImage(background)
//       ctx.drawImage(backimg, 0, 0)

//       const avimg = await Canvas.loadImage(avatarURL)
//       ctx.save()

//       ctx.beginPath()
//       ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
//       ctx.closePath()
//       ctx.clip()

//       ctx.drawImage(avimg, av.x, av.y)
//       ctx.restore()

//       // write in text
//       ctx.fillStyle = "white"
//       ctx.textAlign = "center"

//       // draw in Welcome
//       ctx.font = "100px font"
//       ctx.fillText("Welcome", dim.width / 2, dim.margin + 70)

//       // draw in the username
//       ctx.font = "70px font"
//       ctx.fillText(userTag, dim.width / 2, dim.height - dim.margin - 125)

//       // draw in to the server
//       ctx.font = "50px font"
//       ctx.fillText("You are the " + memberCount + "th member", dim.width / 2, dim.height - dim.margin - 50)

//       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
//       return attachment
//     }


//     const img = await generateImage(member)

//     member.guild.channels.cache.get("781592242371952706").send({
//       content: `Hey ${member}, welcome to **${member.guild.name}!** Make sure to read the <#781592242371952701>, get your <#781866203336409169>, and read the <#915180660262580235>. Hope you have a good time here!`,
//       files: [img]
//     })
// })

client.login(process.env.TOKEN);