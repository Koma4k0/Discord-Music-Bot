const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { supportUrl, inviteUrl, voteUrl } = require("../../../settings/config.js");
const ms = require("pretty-ms");

module.exports = {
    name: "about",
    description: "Show information about the bot.",
    category: "Information",
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
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const playingPlayers = client.poru.leastUsedNodes[0].stats.players;
        let uptime = await client.uptime;

        let scount = client.guilds.cache.size;
        let mcount = 0;

        client.guilds.cache.forEach((guild) => {
            mcount += guild.memberCount;
        });

        const row = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setLabel("Invite Me").setURL(inviteUrl).setStyle(ButtonStyle.Link))
            .addComponents(new ButtonBuilder().setLabel("Vote Me").setURL(voteUrl).setStyle(ButtonStyle.Link))
            .addComponents(new ButtonBuilder().setLabel("Support Server").setURL(supportUrl).setStyle(ButtonStyle.Link));

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.members.me.displayName} About Panel!`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(
                `👋🏻 Hey **${interaction.member}**, Me **${client.user}** \n\n<a:Fancy_Dot:1201282141892391074> **__About Sound Wave__**\n**A best and advanced Discord-Music bots with Premium system and high quality music.**`
            )
            .addFields([
                { name: `<:home:1202594076185337897> Server`, value: `\`\`\`Total: ${scount} Server\`\`\``, inline: true },
                { name: `<:users:1202594170296991794> Users`, value: `\`\`\`Total: ${mcount} Users\`\`\``, inline: true },
                { name: `<:djs:1202594256900849676> Discord.js`, value: `\`\`\`v14.11.0\`\`\``, inline: true },
                { name: `<:online:1202594323925958706> Node.js`, value: `\`\`\`v20.0.1\`\`\``, inline: true },
                { name: `<:time:1202594405593251840> Uptime`, value: `\`\`\`${ms(uptime)}\`\`\``, inline: true },
                { name: `<:ping:1202594477689016380> Ping`, value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``, inline: true },
                { name: `<:developer:1201259721697529916> Creator`, value: `\`\`\`[Koma4k](https://koma4k.xyz/)\`\`\``, inline: true },
                { name: `<:utility:1202594627694366720> Team`, value: `\`\`\`Non...\`\`\``, inline: true },
            ])
            .setColor(client.color)
            .setFooter({ text: `Sound Wave`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        return interaction.editReply({ embeds: [embed], components: [row] });
    },
};
