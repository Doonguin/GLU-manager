// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command
const notion =
  "https://gluwebdev.notion.site/Module-17-NodeJs-13b46f243799434daec96ad8acedf23a";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("notion")
    .setDescription("de notion link van de module waar we mee bezig zijn"),

  async execute(interaction) {
    await interaction.reply(notion);
  },
};
