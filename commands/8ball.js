// Import libraries
const { SlashCommandBuilder } = require('discord.js');

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('magic8ball')
        .setDescription('Reageert met een Magic 8-ball antwoord'),

    async execute(interaction) {
        const possibleReplies = [
            "Het is zeker.",
            "Het is zo beslist.",
            "Zonder twijfel.",
            "Ja zeker.",
            "Je mag erop vertrouwen.",
            "Hoe ik het zie, ja.",
            "Waarschijnlijk.",
            "Ziet er goed uit.",
            "Ja.",
            "Teken wijzen naar ja.",
            "Het antwoord is onduidelijk, probeer opnieuw.",
            "Vraag later nog eens.",
            "Kan ik nu niet voorspellen.",
            "Concentreer je en vraag opnieuw.",
            "Reken er niet op.",
            "Mijn antwoord is nee.",
            "Mijn bronnen zeggen nee.",
            "Nee.",
            "Heel twijfelachtig."
        ];

        const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
        await interaction.reply(randomReply);
    },
};
