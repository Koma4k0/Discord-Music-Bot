const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "owner-help",
    description: "Show All Commands For Bot Owner",
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
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const embed = new EmbedBuilder().setDescription(`**Commands Owner | Sound Wave ❤**\n\n <:stars:1202367728464437298> **Premium Commands**\`\`\`yml\nsw!generate : Generate premium user code.\nsw!unpremium : Delete user from premium.\nsw!list : Get list of all premium user.\`\`\`\n\n <:developer:1201259721697529916> **Developer Commands**\`\`\`yml\nsw!ban : Ban a user from using the bot.\nsw!maintenance : Maintenance mode.\nsw!eval : Bot eval.\`\`\``).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};

