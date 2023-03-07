// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const rooster = "test";

// Build slash command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rooster")
    .setDescription("vraag je weekrooster op"),

  async execute(interaction) {
    await interaction.reply({
      content: rooster,
      ephemeral: true,
      embeds: [
        {
          type: "rich",
          title: `rooster`,
          description: `rooster table`,
          color: 0x00ffff,
        },
      ],
    });
  },
};
