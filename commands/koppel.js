// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = './db/leerlingen.json';

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('koppel')
        .setDescription('Koppel je leerling nummer aan je discord')
        .addStringOption(option => 
                option.setName('naam')
                    .setDescription('Je naam')
                    .setRequired(true)
            )
        .addStringOption(option => 
                option.setName('klas')
                    .setDescription('Je klas (Bijv. 1WDV1)')
                    .setRequired(true)
            )
        .addIntegerOption(option =>
                option.setName('leerling')
                    .setDescription('Je leerling nummer')
                    .setRequired(true)
            ),

    async execute(interaction) {
        const naam = interaction.options.getString('naam').toLowerCase();
        const klas = interaction.options.getString('klas').toUpperCase();
        const leerlingnummer = interaction.options.getInteger('leerling');
        const email = `${leerlingnummer}@student.glu.nl`;

        fs.readFile(path, 'utf8', (err, res) => {
            if (err) { console.log(err); return }

            // Get students from "db"
            const obj = JSON.parse(res);

            // Write to "db"
            obj.leerlingen[interaction.user.id] = {};
            obj.leerlingen[interaction.user.id].name = naam;
            obj.leerlingen[interaction.user.id].class = klas;
            obj.leerlingen[interaction.user.id].llnr = leerlingnummer;
            obj.leerlingen[interaction.user.id].email = email;

            fs.writeFile(path, JSON.stringify(obj, null, 4), err => {
                if (err) { console.log(err); return }
            });
        });

        const embedKoppel = new EmbedBuilder()
            .setTitle('Koppelen gelukt!')
            .setColor('Yellow')
            .setDescription('De volgende gegevens zijn opgeslagen')
            .addFields([
                { name: 'Naam', value: `${naam}`, inline: true },
                { name: 'Klas', value: `${klas}`, inline: true },
                { name: 'Leerling nummer', value: `${leerlingnummer}`, inline: true },
                { name: 'School email', value: `${email}`, inline: true }
            ])
            .setFooter({ text: 'Iets niet goed? Gebruik het command nog een keer om het aan te passen!' });

        interaction.reply({ 
            embeds: [ embedKoppel ]
        });
    }
}