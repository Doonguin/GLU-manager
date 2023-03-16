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

        const classCheck = JSON.parse(fs.readFileSync('./db/klassen.json'));

        if (!classCheck.klassen.hasOwnProperty(interaction.guild.id)) {
            return await interaction.reply({ content: 'Maak eerst een aantal klassen aan met het command "/klas-toevoegen" om dit command te laten werken!', ephemeral: true });
        }

        if (channel.parentId == null) {
            return await interaction.reply({ content: 'Dit is een kanaal categorie.\nSelecteer een geldig tekst kanaal alstublieft!', ephemeral: true });
        }

        if (channel.hasOwnProperty('videoQualityMode')) {
            return await interaction.reply({ content: 'Dit is een spraak kanaal.\nSelecteer een geldig tekst kanaal alstublieft!', ephemeral: true });
        }

        const res = fs.readFileSync('./db/klassen.json');
        const obj = JSON.parse(res).klassen;

        if (!obj.hasOwnProperty(interaction.guild.id)) obj[interaction.guild.id] = [];

        const klasSelect = new ActionRowBuilder();

        const klasSelectEmbed = new EmbedBuilder()
            .setTitle('Welkom in de GLU server!')
            .setColor('Yellow')
            .setDescription('Selecteer hier onderaan alstjeblieft je klas.');
        
        const resMsg = fs.readFileSync('./db/component-msg.json');
        const objMsg = JSON.parse(resMsg);

        if (!objMsg.componentMsg.hasOwnProperty(interaction.guild.id)) {
            objMsg.componentMsg[interaction.guild.id] = {}
        }

        if (objMsg.componentMsg[interaction.guild.id].hasOwnProperty('classDropdown')) {
            return await interaction.reply({ content: "Deze server heeft al een klassen dropdown menu!", ephemeral: true });
        }

        const klassen = obj[interaction.guild.id].map(klas => ({
            label: klas.name,
            value: klas.value
        }));

        klasSelect.addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('klassen')
                .setPlaceholder('Selecteer je klas')
                .addOptions(...klassen)
        );
            
        const klasMessage = await channel.send({ embeds: [klasSelectEmbed], components: [klasSelect] });

        objMsg.componentMsg[interaction.guild.id].classDropdown = {
            "messageID": klasMessage.id, 
            "channelID": channel.id 
        };

        try {
            fs.writeFileSync('./db/component-msg.json', JSON.stringify(objMsg, null, 4));
        } catch(err) {
            console.log(err);
            return await interaction.reply({ content: 'Er is een fout opgetreden!\nProbeer het later nog eens!', ephemeral: true });
        }

        await interaction.reply({ content: `Succesvol het bericht aangemaakt!\nHier is het bericht: ${klasMessage.url}`, ephemeral: true });
    }
}