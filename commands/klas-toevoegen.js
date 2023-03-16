// Import libraries
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

// Build slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('klas-toevoegen')
        .setDescription('Voeg een klas toe aan je "school"')
        .addStringOption(option =>
                option.setName('naam')
                    .setDescription('De naam van de klas')
                    .setRequired(true)
            ),

    async execute(interaction) {
        const className = interaction.options.getString('naam')
        const res = fs.readFileSync('./db/klassen.json');
        const obj = JSON.parse(res);

        if (!obj.klassen.hasOwnProperty(interaction.guild.id)) {
            obj.klassen[interaction.guild.id] = [];
        }

        const newEntry = {
            name: className,
            value: className
        }

        obj.klassen[interaction.guild.id].push(newEntry);

        try {
            fs.writeFileSync('./db/klassen.json', JSON.stringify(obj, null, 4));
        } catch(err) {
            console.log(err);
            return await interaction.reply({ content: 'Er is iets fout gegaan!\nProbeer het later nog eens!', ephemeral: true });
        }

        const resComp = JSON.parse(fs.readFileSync('./db/component-msg.json'));

        if (!resComp.componentMsg.hasOwnProperty(interaction.guild.id)) {
            resComp.componentMsg[interaction.guild.id] = {};
        }

        const dropdownClasses = resComp.componentMsg[interaction.guild.id];

        try {
            const channelID = dropdownClasses.hasOwnProperty('classDropdown') ? dropdownClasses.classDropdown.channelID : false;
            const messageID = dropdownClasses.hasOwnProperty('classDropdown') ? dropdownClasses.classDropdown.messageID : false;

            const channel = channelID ? await interaction.guild.channels.fetch(channelID) : false;
            const message = messageID ? await channel.messages.fetch(messageID) : false;

            const addClass = { label: className, value: className };

            if (channel && message) {
                message.components[0].components[0].data.options.push(addClass);

                message.edit({ components: [message.components[0]] });
            }
        } catch (err) {
            console.log(err);
        }

        await interaction.reply('Message found!');
    }
}