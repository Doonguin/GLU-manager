// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command
const eloURL = "https://elo.glu.nl";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("elo")
    .setDescription("De link naar de elo"),

  async execute(interaction) {
    await interaction.reply(eloURL);
  },
};