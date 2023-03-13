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
        
        const resMsg = fs.readFileSync('./db/component-msg.json');
        const objMsg = JSON.parse(resMsg);

        if (!objMsg.hasOwnProperty(interaction.guild.id)) {
            objMsg[interaction.guild.id] = {}
        }

        if (objMsg[interaction.guild.id].hasOwnProperty('classDropdown')) {
            return await interaction.reply({ content: "Deze server heeft al een klassen dropdwon menu!", ephemeral: true });
        }
        
        const klasMessage = await channel.send({ embeds: [klasSelectEmbed], components: [klasSelect] });

        objMsg[interaction.guild.id].classDropdown = klasMessage.id;

        try {
            fs.writeFileSync('./db/component-msg.json', JSON.stringify(objMsg, null, 4));
        } catch(err) {
            console.log(err);
            return await interaction.reply({ content: 'Er is een fout opgetreden!\nProbeer het later nog eens!', ephemeral: true });
        }

        await interaction.reply({ content: `Succesvol het bericht aangemaakt!\nHier is het bericht: ${klasMessage.url}`, ephemeral: true });
    }
}