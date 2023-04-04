// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const embed = {
  type: "rich",
  title: `rooster`,
  description: `wdv rooster`,
  color: 0x00ffff,
  fields: [
    {
      name: `Maandag`,
      value: `program | 9.00 - 11.45 | TTI\nkeuzendeel | 12.15 -16.30`,
    },
    {
      name: `Dinsdag`,
      value: `program | 9.00 - 13.45 | LST\n`,
    },
    {
      name: `Woensdag`,
      value: `loopbaan | 8.30 - 9.30 | LST\nvb bpv |9.30 - 10.45 | JOS\neng | 10.45 - 12.15 | RSE`,
    },
    {
      name: `Donerdag`,
      value: `bureau | 9.00 - 16.00 | KBR`,
    },
    {
      name: `Vrijdag`,
      value: `ned | 8.30 - 10.00 | ENI\nprogram | 10.15 - 12.45 | JOS\nrek | 13.15 - 14.45 | MWE`,
    },
  ],
  image: {
    url: `https://cdn.discordapp.com/attachments/1074680009417044072/1082683238079795320/index.png`,
    height: 0,
    width: 0,
  },
  url: `https://rooster.glu.nl/schedule`,
};
// Build slash command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rooster")
    .setDescription("vraag je weekrooster op"),

  async execute(interaction) {
    await interaction.reply({
      embeds: [embed],
    });
  },
};
