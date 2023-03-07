// Import libraries
const { SlashCommandBuilder } = require("discord.js");

var rooster = "test";
// Build slash command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rooster")
    .setDescription("vraag je weekrooster op"),

  async execute(interaction) {
    await interaction.reply(rooster);
  },
};
