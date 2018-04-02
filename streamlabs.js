const streamlabs_config = require('./streamlabs_config.json'),
    async = require('async');

const q = async.queue((task, callback) => {
    task.keyboard.newFollower(callback);
}, 1);

const qDonation = async.queue((task, callback) => {
    task.keyboard.donation(task.donate, callback);
}, 1);

class Streamlabs {
    constructor(keyboard) {
        this.donate = {
            meta: 1000,
            current: 0
        }

        this.socket = require('socket.io-client')(`https://sockets.streamlabs.com?token=${streamlabs_config.token}`);

        this.socket.on("connect", () => {
            console.log("CONNECTED");
        });

        this.socket.on("event", (event) => {
            switch (event.type) {
                case 'follow':
                    q.push({keyboard});
                    break;
                case 'donation':
                    if (event.message) {
                        let donate = parseFloat(event.message[0]["amount"]);
                        this.donate.current = this.donate.current + donate;
                    }
                    console.log('ticker', this.donate);
                    qDonation.push({keyboard, donate: this.donate});
                    break;
                default:
                    console.log(event.type);
            }
        });
    }
}


module.exports = Streamlabs;