const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageActionRow,
  MessageEmbed,
} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-ticket")
    .setDescription("Create a ticket"),

  async execute(interaction) {
    // Create the embed message
    const footer = {
      text: "Ticket Bot",
      iconURL: "https://example.com/ticket-bot-icon.png",
    };

    const ticketEmbed = new Discord.MessageEmbed();
    embet.setColor("#0099ff");
    embet.setTitle("Ticket");
    embet.setDescription("Click the button below to create a ticket channel!");
    embet.setFooter(footer);
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("create_ticket")
        .setLabel("Create Ticket")
        .setStyle("PRIMARY")
        .setEmoji("🎫")
    );
    // Send the embed message and add the reaction
    const message = await interaction.reply({
      embeds: [ticketEmbed],
      components: [row],
      fetchReply: true,
    });

    // Create a filter for the reaction collector
    const filter = (reaction, user) =>
      reaction.emoji.name === "🎫" && !user.bot;

    // Create a reaction collector
    const collector = message.createMessageComponentCollector({
      componentType: "BUTTON",
      time: 10000,
    });

    // Handle the collected reactions
    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();

      // Create a new channel for the ticket
      const channel = await interaction.guild.channels.create("ticket", {
        parent: "Ticket",
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL"],
          },
        ],
      });

      // Send a welcome message in the new channel
      const welcomeEmbed = new EmbedBuilder()
        .setColor("GREEN")
        .setTitle(`Welcome to your ticket, ${user.username}`)
        .setDescription(
          "Please describe your issue and our support staff will assist you shortly!"
        );

      await channel.send({ embeds: [welcomeEmbed] });

      // Add a reaction to close the ticket
      await channel.send("React with ❌ to close this ticket.");
      const closeEmoji = "❌";
      channel.lastMessage.react(closeEmoji);

      // Create a filter for the reaction collector
      const closeFilter = (reaction, user) =>
        reaction.emoji.name === closeEmoji && !user.bot;

      // Create a reaction collector for the close ticket reaction
      const closeCollector = channel.createReactionCollector({
        closeFilter,
        time: 60000,
      });

      // Handle the collected reactions for the close ticket reaction
      closeCollector.on("collect", async (reaction, user) => {
        if (user.bot) return;

        // Delete the channel
        await channel.delete();

        // Stop the reaction collectors
        collector.stop();
        closeCollector.stop();
      });
    });
  },
};
