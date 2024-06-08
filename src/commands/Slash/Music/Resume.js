const { EmbedBuilder } = require("discord.js");
const GControl = require("../../../settings/models/Control.js");

module.exports = {
    name: "resume",
    description: "Resume current paused song.",
    category: "Music",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const Control = await GControl.findOne({ guild: interaction.guild.id });

        // When button control "enable", this will make command unable to use. You can delete this if you want!
        if (Control.playerControl === "enable") {
            const ctrl = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\<:icon_cross:1201253258749030440>\ | You can't use this command as the player control was enable!`);
            return interaction.editReply({ embeds: [ctrl] });
        }

        const player = client.poru.players.get(interaction.guild.id);

        if (player.isPaused) {
            await player.pause(false);

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\<:F_arrow:1201280437994143795>\ | Song has been: \`Resumed\``);

            return interaction.editReply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\<:icon_cross:1201253258749030440>\ | Song is not: \`Paused\``);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
