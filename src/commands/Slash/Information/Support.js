const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "support",
    description: "Get help with the bot",
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

        const embed = new EmbedBuilder().setDescription(`You can get support for Sound Wave by clicking [here](https://koma4k.xyz/).`).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};
