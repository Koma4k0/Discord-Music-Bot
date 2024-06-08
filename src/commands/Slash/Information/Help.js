const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const { readdirSync } = require("fs");
  const {
    supportUrl,
    inviteUrl,
    voteUrl,
  } = require("../../../settings/config.js");
  
  module.exports = {
    name: "help",
    description: "Display all commands of the bot.",
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
  
      const row2 = new ActionRowBuilder()
              .addComponents(new ButtonBuilder().setLabel("Invite Me").setURL(inviteUrl).setStyle(ButtonStyle.Link))
              .addComponents(new ButtonBuilder().setLabel("Dashboard").setURL("https://soundwave.xyz/").setStyle(ButtonStyle.Link))
              .addComponents(new ButtonBuilder().setLabel("Vote Me").setURL(voteUrl).setStyle(ButtonStyle.Link))
              .addComponents(new ButtonBuilder().setLabel("Support Server").setURL(supportUrl).setStyle(ButtonStyle.Link));
  
      const categories = readdirSync("./src/commands/Slash/");
  
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.guild.members.me.displayName} Help Panel! 💖`,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setColor(client.color)
        .setDescription(
          `👋🏻 **${interaction.member}**, Myself **${client.user}** \n\n<:F_arrow:1201280437994143795> **${client.user.username}**\n**An Advanced Discord MusicBot with User-Friendly Interface. I Promise you that I will try my Best to Give you the beat of Music Clearly.** \n\n<:stats:1201280606403842058> **__Category Family__**\n<:info:1201252979299324044>  **Information**\n<:music:1201281098785751171>  **Music**\n<:Premium:1201258993625092207> **Premium**\n<:developer:1201259721697529916>  **Developer**\n<:filters:1201281473295175690>  **Filters**\n\n<:ping:1201281566362566827> **__Status__:  ${client.user.username}**\n<:servers:1201281671190810755>  Servers: **${client.guilds.cache.size}**\n<:ping:1201281566362566827>  Ping: **${Math.round(client.ws.ping)}ms**\n`,
        )
        .setFooter({
          text: `Sound Wave`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();
  
      const row = new ActionRowBuilder().addComponents([
        new StringSelectMenuBuilder()
          .setCustomId("help-category")
          .setPlaceholder(`Sound Wave Commands`)
          .setMaxValues(1)
          .setMinValues(1)
          .setOptions(
            categories.map((category) => {
              return new StringSelectMenuOptionBuilder()
                .setLabel(category)
                .setValue(category);
            }),
          ),
      ]);
  
      interaction
        .editReply({ embeds: [embed], components: [row, row2] })
        .then(async (msg) => {
          let filter = (i) =>
            i.isStringSelectMenu() &&
            i.user &&
            i.message.author.id == client.user.id;
  
          let collector = await msg.createMessageComponentCollector({
            filter,
            time: 90000,
          });
  
          collector.on("collect", async (m) => {
            if (m.isStringSelectMenu()) {
              if (m.customId === "help-category") {
                await m.deferUpdate();
  
                let [directory] = m.values;
  
                const embed = new EmbedBuilder()
                  .setAuthor({
                    name: `${interaction.guild.members.me.displayName} Help Command!`,
                    iconURL: interaction.guild.iconURL({ dynamic: true }),
                  })
                  .setDescription(
                    `\ \n\n**\<:F_arrow:1201280437994143795> ${
                      directory.slice(0, 1).toUpperCase() + directory.slice(1)
                    } Commands:**\n${client.slashCommands
                      .filter((c) => c.category === directory)
                      .map((c) => `\`${c.name}\` : *${c.description}*`)
                      .join("\n")}`,
                  )
                  .setColor(client.color)
                  .setFooter({
                    text: `Sound Wave | Total Commands: ${
                      client.slashCommands.filter((c) => c.category === directory)
                        .size
                    }`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                  })
                  .setTimestamp();
  
                msg.edit({ embeds: [embed] });
              }
            }
          });
  
          collector.on("end", async (collected, reason) => {
            if (reason === "time") {
              const timed = new EmbedBuilder()
                .setAuthor({
                  name: `${interaction.guild.members.me.displayName} Help Panel! 💖`,
                  iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .setDescription(`Please use /help again for Checking Commands`)
                .setColor(client.color)
                .setFooter({
                  text: `Join Support For Premium`,
                  iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setTimestamp();
  
              msg.edit({ embeds: [timed], components: [row2] });
            }
          });
        });
    },
  };
  