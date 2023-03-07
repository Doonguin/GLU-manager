// Import libraries
const { SlashCommandBuilder } = require('discord.js');

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('Ping')
        .setDescription('Replies with pong'),

    async execute(interaction) {
        await interaction.reply('Pong');
    }
}