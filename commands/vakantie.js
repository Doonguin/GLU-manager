// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Set the target date
const targetDate = new Date("May 8, 2023");

// Build slash command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("vakantie")
    .setDescription("de volgende vakantie"),

  async execute(interaction) {
    // Check if the current date is after the target date
    const currentDate = new Date();
    if (currentDate > targetDate) {
      await interaction.reply("Zomervakantie: 8 juli 2023 t/m 20 augustus 2023");
    } else {
      await interaction.reply("Meivakantie: 29 april 2023 t/m 7 mei 2023");
    }
  },
};