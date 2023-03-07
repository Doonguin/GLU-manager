// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command
const bureau =
  "https://www.notion.so/het-bureau/Het-BUREAU-1b3b8358bc184ac29e93dcdaf5823369";
const webdev =
  "https://gluwebdev.notion.site/Module-17-NodeJs-13b46f243799434daec96ad8acedf23a";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("notion")
    .setDescription("de notion link van de module waar we mee bezig zijn")
    .addSubcommand((subcommand) =>
      subcommand.setName("bureau").setDescription("the notion of het bureau")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("webdev").setDescription("de notion of webdev")
    ),
  async execute(interaction) {
    await interaction.reply(notion);
  },
};
