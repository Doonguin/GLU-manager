// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Build slash command
const embet = {
  type: `rich`,
  title: `help`,
  description: `hulp nodig?`,
  color: 0x00ffff,
  fields: [
    {
      name: `/rooster`,
      value: `vraag je school rooster op`,
    },
    {
      name: `/notion`,
      value: `hier vind je de notion link`,
    },
    {
      name: `/vakantie`,
      value: `Hoeveel dagen tot de volgende vakantie zijn er nog?`,
    },
    {
      name: `/poll`,
      value: `creer een poll`,
    },
  ],
  image: {
    url: `https://cdn.discordapp.com/attachments/1074680009417044072/1082683238079795320/index.png`,
    height: 0,
    width: 0,
  },
};
module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("hulp nodig?"),

  async execute(interaction) {
    await interaction.reply({ embeds: [embet] });
  },
};
