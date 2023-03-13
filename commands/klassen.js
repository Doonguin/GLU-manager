// Import libraries
const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('klassen')
        .setDescription('Maakt een dropdown in het door jou aangegeven kanaal')
        .addChannelOption(option =>
            option.setName('kanaal')
                .setDescription('Het kanaal waar het bericht in gestuurd moet worden')
                .setRequired(true)
            ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('kanaal');

        if (channel.parentId == null) {
            return await interaction.reply({ content: 'Dit is een kanaal categorie.\nSelecteer een geldig tekst kanaal alstublieft!', ephemeral: true });
        }

        if (channel.hasOwnProperty('videoQualityMode')) {
            return await interaction.reply({ content: 'Dit is een spraak kanaal.\nSelecteer een geldig tekst kanaal alstublieft!', ephemeral: true });
        }

        const res = fs.readFileSync('./db/klassen.json');
        const obj = JSON.parse(res).klassen[interaction.guild.id];

        const klassen = obj.map(klas => ({
            label: klas.name,
            value: klas.value
        }));

        const klasSelect = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('klassen')
                    .setPlaceholder('Selecteer je klas')
                    .addOptions(...klassen)
            );
 
        const klasSelectEmbed = new EmbedBuilder()
                        .setTitle('Welkom in de GLU server!')
                        .setColor('Yellow')
                        .setDescription('Selecteer hier onderaan alstjeblieft je klas.');
        
        const klasMessage = await channel.send({ embeds: [klasSelectEmbed], components: [klasSelect] });
        await interaction.reply({ content: `Succesvol het bericht aangemaakt!\nHier is het bericht: ${klasMessage.url}`, ephemeral: true });
    }
}