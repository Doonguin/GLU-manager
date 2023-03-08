// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = './db/leerlingen.json';

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('profiel')
        .setDescription('Laat je school profiel zien'),

    async execute(interaction) {
        fs.readFile(path, 'utf8', async (err, res) => {
            if (err) { console.log(err); return }

            // Leerlingen object for later use
            const obj = JSON.parse(res);

            // Check if student has connected their school to their discord
            if (!obj.leerlingen.hasOwnProperty(interaction.user.id)) {
                return await interaction.reply({ 
                    content: 'Het ziet er naar uit dat je niet je discord hebt gekoppeld aan je school!\nGebruik **/koppel** om dit te doen.',
                    ephemeral: true
                });
            }

            // apply the json data to the embed
            const naam = obj.leerlingen[interaction.user.id].name;
            const klas = obj.leerlingen[interaction.user.id].class;
            const leerlingnummer = obj.leerlingen[interaction.user.id].llnr;
            const email = obj.leerlingen[interaction.user.id].email;
            const profielEmbed = new EmbedBuilder()
                .setTitle(`${naam}'s school profiel`)
                .setColor('Yellow')
                .addFields([
                    { name: 'Naam', value: `${naam}` },
                    { name: 'Klas', value: `${klas}` },
                    { name: 'Leerlingnummer', value: `${leerlingnummer}` },
                    { name: 'Email', value: `${email}` }
                ]); 


            await interaction.reply({ embeds: [ profielEmbed ] });
        });
    }
}