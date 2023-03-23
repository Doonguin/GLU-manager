const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Enter the poll question")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option1")
        .setDescription("Enter the first option for the poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("option2")
        .setDescription("Enter the second option for the poll")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Get poll question and options from user input
    const question = interaction.options.getString("question");
    const option1 = interaction.options.getString("option1");
    const option2 = interaction.options.getString("option2");

    // Create embed message for poll
    const pollEmbed = new EmbedBuilder()
      .setColor("000")
      .setTitle(`Poll: ${question}`)
      .setDescription(
        `React with 👍 for ${option1}\nReact with 👎 for ${option2}`
      );

    // Send the poll message and add reactions
    // Send the poll message and add reactions
    const channel = await interaction.client.channels.fetch(
      interaction.channelId
    );
    const pollMessage = await channel.send({ embeds: [pollEmbed] });
    pollMessage.react("👍");
    pollMessage.react("👎");
  },
};
