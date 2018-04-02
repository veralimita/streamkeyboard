const tmi = require('tmi.js'),
    config = require('./config.json'),
    async = require('async');

const q = async.queue((task, callback) => {
    task.keyboard.writeMessage(task.message, task.type, callback);
}, 1);


class Twitch {
    constructor(config) {
        this.client = new tmi.client(config);
        this.client.connect();
    }

    listen(keyboard) {
        this.client.on("message", (channel, userstate, message, self) => {

            if (message.indexOf('@couchplaygirl') != -1) {
                const clearMessage = message.replace('@couchplaygirl ', '').replace('@couchplaygirl', '');
                return q.push({keyboard, message: clearMessage, type: 'direct'});
            }

            if (message.indexOf('_name') != -1) {
                return q.push({keyboard, message: userstate['display-name']});
            }

            if (self) return;

            keyboard.message();
        });
    }

}

module.exports = new Twitch(config);