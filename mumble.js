const mumble = require('mumble');
const config = require('./config.js');

let connectedUsers = [];

module.exports.connect = () => {
  console.log('Connecting to mumble');
  mumble.connect(config.mumble.url, {}, (error, connection) => {
    if (error) {
      throw new Error(error);
    }

    connection.authenticate('BottyMcBotface');

    connection.on('initialized', () => {
      console.log('connection ready');
      connectedUsers = connection
        .users()
        .map(user => user.name)
        .filter(name => name !== config.mumble.name);
      pushUpdatedUserlist();
    });

    connection.on('user-disconnect', user => {
      console.log('User ' + user.name + ' disconnected');
      connectedUsers.splice(connectedUsers.indexOf(user.name), 1);
      pushUpdatedUserlist();
    });
    connection.on('user-connect', user => {
      console.log('User ' + user.name + ' connected');
      if (user.name !== config.mumble.name) {
        connectedUsers.push(user.name);
        pushUpdatedUserlist();
      }
    });
  });
};

pushUpdatedUserlist = () => {
  if (this.updateUserList) {
    this.updateUserList(connectedUsers);
  }
};

module.exports.onUserlistUpdate = onUserlistUpdate = callback => {
  this.updateUserList = callback;
};
