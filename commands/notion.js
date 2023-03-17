// Import libraries
const { SlashCommandBuilder } = require("discord.js");

// Build slash command

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
    switch (interaction.options.getSubCommand()) {
      case "bureau": {
        const notion =
          "https://www.notion.so/het-bureau/Het-BUREAU-1b3b8358bc184ac29e93dcdaf5823369";

        interaction.reply({ content: notion });
        break;
      }
      case "webdev": {
        const notion =
          "https://www.notion.so/het-bureau/Het-BUREAU-1b3b8358bc184ac29e93dcdaf5823369";
        interaction.reply({ content: notion });
        break;
      }
    }
  },
};
