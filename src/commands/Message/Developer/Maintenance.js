const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "maintenance",
    description: "Maintenance Mode.",
    category: "Developer",
    aliases: ["maintenance", "mt"],
    owner: true,
    run: async (client, message, args) => {
        const value = args[0];
        const mode = ["enable", "disable"];

        if (!value) return message.reply({ content: `<:xx:1202361957928144968> | You didn't provide any maintenance mode: \`${mode.join(", ")}\`` });

        if (!mode.includes(args[0]))
            return message.reply({ content: `<:xx:1202361957928144968> | You didn't provide any valid maintenance mode: \`${mode.join(", ")}\`` });

        const enable = true;

        const embed = new EmbedBuilder().setColor(client.color).setTimestamp();

        if (value === "enable") {
            if (client.dev.has(enable)) {
                embed.setDescription(`<:xx:1202361957928144968> | Maintenance mode is already: \`Enabled\``);

                return message.reply({ embeds: [embed] });
            }

            await client.dev.add(enable);

            embed.setDescription(`<a:on2:1201254179381977181> | Maintenance mode has been: \`Enabled\``);

            return message.reply({ embeds: [embed] });
        }

        if (value === "disable") {
            if (!client.dev.has(enable)) {
                embed.setDescription(`<:xx:1202361957928144968> | Maintenance mode is already: \`Disabled\``);

                return message.reply({ embeds: [embed] });
            }

            await client.dev.delete(enable);

            embed.setDescription(`<a:off_off:1201254335275880508> | Maintenance mode has been: \`Disabled\``);

            return message.reply({ embeds: [embed] });
        }
    },
};
