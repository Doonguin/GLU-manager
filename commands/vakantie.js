// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command
const notion =
  "Meivakantie: 29 april 2023 t/m 7 mei 2023";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("vakantie")
    .setDescription("de volgende vakantie"),

  async execute(interaction) {
    await interaction.reply(notion);
  },
};