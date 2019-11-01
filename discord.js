const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} in Discord`);
  client.user.setActivity('0 players on mumble');
});

module.exports.connect = function connect() {
  console.log('Connecting to Discord');
  client.login(config.discord.token);
};

module.exports.updateUserlist = function updateUserlist(users) {
  if (client.user) {
    if (users.length === 1) {
      client.user.setActivity(`1 on mumble: ${users[0]}`);
    } else {
      const userlist = users.join(',');
      client.user.setActivity(`${users.length} on mumble: ${userlist}`);
    }
  }
};
