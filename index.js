const discord = require('./discord.js');
const mumble = require('./mumble.js');

discord.connect();
mumble.connect();
mumble.onUserlistUpdate(discord.updateUserlist);
