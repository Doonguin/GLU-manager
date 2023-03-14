// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command
const bureauURL = "https://www.notion.so/het-bureau/Het-BUREAU-1b3b8358bc184ac29e93dcdaf5823369";
const webdevURL = "https://gluwebdev.notion.site/gluwebdev/Leerjaar-2022-2023-a285e26687dc48a88446842ca5da6a06";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notion")
    .setDescription("De Notion link van de module waar we mee bezig zijn")
    .addSubcommand((subcommand) =>
      subcommand.setName("bureau").setDescription("De Notion van Het Bureau")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("webdev").setDescription("De Notion van Webdev")
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    let notion = "";
    switch (subcommand) {
      case "bureau":
        notion = bureauURL;
        break;
      case "webdev":
        notion = webdevURL;
        break;
      default:
        notion = "Ongeldige subcommando";
    }
    await interaction.reply(notion);
  },
};
