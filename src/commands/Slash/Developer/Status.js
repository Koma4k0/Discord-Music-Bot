const { EmbedBuilder, version } = require("discord.js");
const os = require("os");
let cpuStat = require("cpu-stat");

module.exports = {
  name: "status",
  description: "Check status of bot!",
  category: "Developer",
  permissions: {
    bot: [],
    channel: [],
    user: [],
  },
  settings: {
    inVc: false,
    sameVc: false,
    player: false,
    current: false,
    owner: true,
    premium: false,
  },
  run: async (client, message) => {
    let uptime = await os.uptime();

    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor((uptime % (3600 * 24)) / 3600);
    let m = Math.floor((uptime % 3600) / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${message.guild.members.me.displayName} Status Info!`,
          iconURL: message.guild.iconURL({ dynamic: true }),
        })
        .addFields([
          {
            name: "<a:Bot:1201259462770565272> | Client",
            value: `\`\`\`Servers: ${scount}\nChannels: ${ccount}\nUsers: ${mcount}\`\`\``,
            inline: false,
          },
          {
            name: "<a:cpu:1201278696632369192> | CPU",
            value: `\`\`\`Cpu: ${os.cpus().map((i) => `${i.model}`)[0]}\nLoad: ${percent.toFixed(
              2,
            )}%\nPlatform: ${os.platform()}\`\`\``,
            inline: false,
          },
          {
            name: "<a:server:1201278788143697972> | RAM",
            value: `\`\`\`RAM Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(
              os.totalmem() /
              1024 /
              1024 /
              1024
            ).toFixed(2)}GB\`\`\``,
            inline: false,
          },
          {
            name: "<a:discord:1201278866426183741> | Discord",
            value: `\`\`\`Discord.js: v${version}\nNode: ${process.version}\nAPI Websocket Ping: ${Math.round(
              client.ws.ping,
            )}ms\`\`\``,
            inline: false,
          },
          {
            name: "<:System:1201278920423645194> | System",
            value: `\`\`\`Uptime: ${dDisplay + hDisplay + mDisplay + sDisplay}\`\`\``,
            inline: true,
          },
        ])
        .setColor(client.color)
        .setTimestamp(Date.now());

      return message.reply({ embeds: [embed] });
    });
  },
};
