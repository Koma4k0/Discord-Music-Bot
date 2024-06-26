const { EmbedBuilder } = require("discord.js");
const GControl = require("../../../settings/models/Control.js");

module.exports = {
    name: "skip",
    description: "Skip the current played song.",
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

        if (!player || player.queue.size == 0) {
            const embed = new EmbedBuilder().setDescription(`\<:icon_cross:1201253258749030440>\ | Next song was: \`Not found\``).setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        } else {
            await player.stop();

            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\<:skip:1201252549974573208>\ | Song has been: \`Skipped\``);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
