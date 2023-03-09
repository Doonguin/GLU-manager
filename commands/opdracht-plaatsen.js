// Import libraries
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = './db/opdrachten.json';

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('nieuwe-opdracht')
        .setDescription('Maak een opdracht aan in het systeem')
        .addStringOption(option =>
            option.setName('vak')
                .setDescription('Voor welk vak de opdracht is')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('titel')
                .setDescription('De titel van de opdracht')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('klas')
                .setDescription('Voor welke klas de opdracht is (Bijv. 2WDV1)')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('omschrijving')
                .setDescription('Een korte omschrijving van de opdracht')
                .setRequired(true)    
        )
        .addNumberOption(option => 
            option.setName('deadline')
                .setDescription('De deadline van de opdracht (DDMMYYYY, Bijv. 03112023)')
                .setRequired(true)    
        )
        .addBooleanOption(option => 
            option.setName('harde-deadline')
                .setDescription('Of de opdracht een harde deadline heeft of niet')
                .setRequired(true)    
        ),

    async execute(interaction) {
        const prof = interaction.options.getString('vak').toLowerCase();
        const title = interaction.options.getString('titel').toLowerCase();
        const className = interaction.options.getString('klas').toLowerCase();
        const desc = interaction.options.getString('omschrijving').toLowerCase();
        const deadline = interaction.options.getNumber('deadline').toString();
        const hardDead = interaction.options.getBoolean('harde-deadline');

        fs.readFile(path, 'utf8', async (err, res) => {
            if (err) { 
                console.log(err); 
                return await interaction.reply({ content: '**Er is iets mis gegaan tijdens het ophalen van de data...**' });
            }

            const obj = JSON.parse(res);

            // Write details to file
            if (!obj.opdrachten.hasOwnProperty(prof)) {
                obj.opdrachten[prof] = {};
            }

            obj.opdrachten[prof][title] = {};
            obj.opdrachten[prof][title].class = className;
            obj.opdrachten[prof][title].desc = desc;
            obj.opdrachten[prof][title].deadline = deadline;
            obj.opdrachten[prof][title].hardDead = hardDead;

            fs.writeFile(path, JSON.stringify(obj, null, 4), async (err) => {
                if (err) { 
                    console.log(err); 
                    return await interaction.reply({ content: '**Er is iets mis gegaan tijdens het schrijven van de data...**' });
                }

                const day = parseInt("0" + deadline.slice(0, 2), 10);
                const monthNum = parseInt("0" + deadline.slice(2, 4), 10);
                const year = parseInt(deadline.slice(4), 10);
                const monthName = new Date(Date.UTC(year, monthNum, 1)).toLocaleString('en-US', { month: 'long' });

                const opdrachtEmbed = new EmbedBuilder()
                    .setTitle('De volgende opdracht is aangemaakt')
                    .setColor('Yellow')
                    .addFields([
                        { name: 'Vak', value: `${prof}`, inline: true },
                        { name: 'Klas', value: `${className}`, inline: true },
                        { name: 'Titel', value: `${title}`, inline: true },
                        { name: 'Omschrijving', value: `${desc}`, inline: true },
                        { name: 'Deadline', value: `${day} ${monthName} ${year}`, inline: true },
                        { name: 'Harde deadline', value: `${hardDead}`, inline: true }
                    ]);

                await interaction.reply({ embeds: [ opdrachtEmbed ] });
            });
        });
    }
}