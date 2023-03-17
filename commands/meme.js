// Import libraries
const { SlashCommandBuilder } = require('discord.js');

// Meme images
const imageUrls = [
    'https://cdn.discordapp.com/attachments/920726738244362260/1086006501639999638/image.png',
    'https://cdn.discordapp.com/attachments/920726738244362260/1086006501639999638/image.png',
    'https://cdn.discordapp.com/attachments/920726738244362260/1086006501639999638/image.png',
];

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Replies with a random meme'),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const randomImageUrl = imageUrls[randomIndex];  
        await interaction.reply({ files: [randomImageUrl] });
    }
}
