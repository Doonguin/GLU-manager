// Import libraries
const { SlashCommandBuilder } = require('discord.js');

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gemiddelde')
        .setDescription('Bereken het gemiddelde van een lijst met cijfers.')
        .addNumberOption(option =>
            option.setName('getal1')
                .setDescription('Het eerste verplichte getal.')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('getal2')
                .setDescription('Het tweede verplichte getal.')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('getal3')
                .setDescription('Een optioneel derde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal4')
                .setDescription('Een optioneel vierde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal5')
                .setDescription('Een optioneel vijfde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal6')
                .setDescription('Een optioneel vierde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal7')
                .setDescription('Een optioneel vierde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal8')
                .setDescription('Een optioneel vierde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal9')
                .setDescription('Een optioneel vierde getal.')
                .setRequired(false)
        )
        .addNumberOption(option =>
            option.setName('getal10')
                .setDescription('Een optioneel vierde getal.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const getal1 = interaction.options.getNumber('getal1', true);
        const getal2 = interaction.options.getNumber('getal2', true);
        const getal3 = interaction.options.getNumber('getal3');
        const getal4 = interaction.options.getNumber('getal4');
        const getal5 = interaction.options.getNumber('getal5');
        const getal6 = interaction.options.getNumber('getal6');
        const getal7 = interaction.options.getNumber('getal7');
        const getal8 = interaction.options.getNumber('getal8');
        const getal9 = interaction.options.getNumber('getal9');
        const getal10 = interaction.options.getNumber('getal10');

        const sum = getal1 + getal2 + (getal3 || 0) + (getal4 || 0) + (getal5 || 0) + (getal6 | 0) + (getal7 || 0) + (getal8 || 0) + (getal9 || 0) + (getal10 || 0);
        const count = (getal3 ? 1 : 0) + (getal4 ? 1 : 0) + (getal5 ? 1 : 0) + (getal6 ? 1 : 0) + (getal7 ? 1 : 0) + (getal8 ? 1 : 0) + (getal9 ? 1 : 0) + (getal10 ? 1 : 0) + 2;
        const gemiddeld = sum / count;

        await interaction.reply(`Het gemiddelde is ${gemiddeld}.`);
    }
}
