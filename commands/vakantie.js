// Import libraries
const { SlashCommandBuilder } = require("discord.js");

const vakanties = [
  { name: "Herfstvakantie", startDate: new Date("October 22, 2022"), endDate: new Date("October 30, 2022") },
  { name: "Kerstvakantie", startDate: new Date("December 24, 2022"), endDate: new Date("January 8, 2023") },
  { name: "Voorjaarsvakantie", startDate: new Date("February 25, 2023"), endDate: new Date("March 5, 2023") },
  { name: "Goede Vrijdag", startDate: new Date("April 7, 2023"), endDate: new Date("April 7, 2023") },
  { name: "Tweede Paasdag", startDate: new Date("April 10, 2023"), endDate: new Date("April 10, 2023") },
  { name: "Koningsdag", startDate: new Date("April 27, 2023"), endDate: new Date("April 27, 2023") },
  { name: "Bevrijdingsdag", startDate: new Date("May 5, 2023"), endDate: new Date("May 5, 2023") },
  { name: "Meivakantie", startDate: new Date("April 29, 2023"), endDate: new Date("May 7, 2023") },
  { name: "Hemelvaart", startDate: new Date("May 18, 2023"), endDate: new Date("May 18, 2023") },
  { name: "Tweede Pinksterdag", startDate: new Date("May 29, 2023"), endDate: new Date("May 29, 2023") },
  { name: "Zomervakantie", startDate: new Date("July 8, 2023"), endDate: new Date("August 20, 2023") },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vakantie")
    .setDescription("de volgende vakantie"),

  async execute(interaction) {
    const currentDate = new Date();
    let volgendeVakantie = "";
    for (let i = 0; i < vakanties.length; i++) {
      if (currentDate < vakanties[i].startDate) {
        if (vakanties[i].startDate.getTime() === vakanties[i].endDate.getTime()) {
          volgendeVakantie = `${vakanties[i].name}: ${vakanties[i].startDate.toLocaleDateString()}`;
        } else {
          volgendeVakantie = `${vakanties[i].name}: ${vakanties[i].startDate.toLocaleDateString()} t/m ${vakanties[i].endDate.toLocaleDateString()}`;
        }
        break;
      }
    }
    if (volgendeVakantie) {
      await interaction.reply(volgendeVakantie);
    } else {
      await interaction.reply("Er zijn geen aankomende vakanties bekend of de vakanties worden niet ingeladen.");
    }
  },
};