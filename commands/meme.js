// Import libraries
const { SlashCommandBuilder } = require('discord.js');

// Meme images
const imageUrls = [
    'https://user-images.githubusercontent.com/90307071/226285865-cbe61794-6e62-4137-82b9-6746ac23b50d.png',
    'https://user-images.githubusercontent.com/90307071/226285918-4ceb46f2-03e4-4814-8a4d-f2489a951c4d.png',
    'https://user-images.githubusercontent.com/90307071/226285972-c5cf49f8-1087-48c9-9261-747105613f29.png',
];

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Reageert met een GLU meme'),

    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const randomImageUrl = imageUrls[randomIndex];  
        await interaction.reply({ files: [randomImageUrl] });
    }
}
