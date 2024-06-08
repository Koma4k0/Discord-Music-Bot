const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Send a ping request.",
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

    const embed = new EmbedBuilder()
      .setDescription(
        `<a:disk:1201282041300398120>  ${client.user.username} Network Ping!\n<a:Fancy_Dot:1201282141892391074> **API Latency:** __${Math.round(client.ws.ping)}ms__\n<a:Fancy_Dot:1201282141892391074> **Websocket Latency:** __${Math.round(client.ws.ping)}__`,
      )
      .setColor(client.color);

    return interaction.editReply({ embeds: [embed] });
  },
};
