const { SlashCommandBuilder } = require('discord.js');
const { axios } = require("axios");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Get dathost account data'),
    async execute(interaction) {
        const username = 'hjsutter@gmail.com'
        const password = '3RedKnight5!'
        const headers = {
            authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        }
        console.log(headers.authorization);
        let response = await fetch('https://dathost.net/api/0.1/account', {
            method: 'GET',
            headers,
        })

        let account = await response.json();
        let returnString = "";
        Object.entries(account).forEach((entry) => {
            const[key, value] = entry;
            returnString = (returnString + `${key}: ${value}\n`);
        })
        interaction.reply(returnString);
    }
};