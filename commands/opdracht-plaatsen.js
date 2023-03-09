// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = './db/opdrachten.json';

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('nieuwe-opdracht')
        .setDescription('Maak een opdracht aan in het systeem'),

    async execute(interaction) {
       
    }
}