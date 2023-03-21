// Import libraries
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Maak een meme met Imgflip')
        .addStringOption(option =>
            option.setName('template')
                .setDescription('The ID van den Imgflip meme template')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('toptext')
                .setDescription('De tekst boven aan de meme')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('bottomtext')
                .setDescription('De tekst onder aan de meme')
                .setRequired(true)),

    async execute(interaction) {
        const username = 'mexicogamer492';
        const password = 'waaromleesjedit';
        const templateId = interaction.options.getString('template');
        const toptext = interaction.options.getString('toptext');
        const bottomtext = interaction.options.getString('bottomtext');
        const apiUrl = `https://api.imgflip.com/caption_image?template_id=${templateId}&username=${username}&password=${password}&text0=${toptext}&text1=${bottomtext}`;
        try {
            const response = await axios.post(apiUrl);
            const imageUrl = response.data.data.url;
            await interaction.reply({ files: [imageUrl] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Oepsie Poepsie, er ging iets mis! owo');
        }
    }
}
