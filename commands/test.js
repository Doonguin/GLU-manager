// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("dit is een test"),

  async execute(interaction) {
    await interaction.reply("tost");
  },
};
