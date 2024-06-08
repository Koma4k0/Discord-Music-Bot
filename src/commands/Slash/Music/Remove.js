const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "remove",
    description: "Remove a song from the queue.",
    category: "Music",
    options: [
        {
            name: "position",
            description: "Position of the song.",
            type: ApplicationCommandOptionType.Number,
            required: true,
            min_value: 1,
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = client.poru.players.get(interaction.guild.id);
        const track = interaction.options.getNumber("position");

        if (track > player.queue.length) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\<:icon_cross:1201253258749030440>\ | Song was not found`);

            return interaction.editReply({ embeds: [embed] });
        }

        await player.queue.remove(track - 1);

        const embed = new EmbedBuilder().setColor(client.color).setDescription(`\<:Check:1201254751833178213>\ | Song has been: \`Removed\``);

        return interaction.editReply({ embeds: [embed] });
    },
};
