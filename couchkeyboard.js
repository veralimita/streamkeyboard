const async = require('async'),
    cyrillicToTranslit = require('cyrillic-to-translit-js');

const firstLine = [
    'ESC',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'PRINT_SCREEN',
    'SCROLL_LOCK',
    'PAUSE_BREAK'
];

const numbers = {
    '1': 'ONE',
    '2': 'TWO',
    '3': 'THREE',
    '4': 'FOUR',
    '5': 'FIVE',
    '6': 'SIX',
    '7': 'SEVEN',
    '8': 'EIGHT',
    '9': 'NINE',
    '0': 'ZERO'
}

const following = [
    'INSERT',
    'HOME',
    'PAGE_UP',
    'KEYBOARD_DELETE',
    'END',
    'PAGE_DOWN'
]

const numpad = [
    'NUM_LOCK',
    'NUM_SLASH',
    'NUM_ASTERISK',
    'NUM_MINUS',
    'NUM_SEVEN',
    'NUM_EIGHT',
    'NUM_NINE',
    'NUM_PLUS',
    'NUM_FOUR',
    'NUM_FIVE',
    'NUM_SIX',
    'NUM_ONE',
    'NUM_TWO',
    'NUM_THREE',
    'NUM_ENTER',
    'NUM_ZERO',
    'NUM_PERIOD'
]

const numpad_ticker = {
    p20: ['NUM_PERIOD',
        'NUM_ZERO'],
    p40: ['NUM_THREE',
        'NUM_TWO',
        'NUM_ONE'],
    p60: ['NUM_FOUR', 'NUM_FIVE', 'NUM_SIX'],
    p80: ['NUM_EIGHT',
        'NUM_NINE', 'NUM_SEVEN'],
    p100: ['NUM_LOCK',
        'NUM_SLASH',
        'NUM_ASTERISK']
}

const numpad_spiral = [
    'NUM_FIVE',
    'NUM_EIGHT',
    'NUM_NINE',
    'NUM_SIX',
    'NUM_THREE',
    'NUM_TWO',
    'NUM_ONE',
    'NUM_FOUR',
    'NUM_SEVEN',
    'NUM_LOCK',
    'NUM_SLASH',
    'NUM_ASTERISK',
    'NUM_MINUS',
    'NUM_PLUS',
    'NUM_ENTER',
    'NUM_PERIOD',
    'NUM_ZERO'
]

class CouchKeyboard {
    constructor() {
        this.logiled = require('logiled');
        this.logiled.init();
        this.logiled.setLighting({
            redPercentage: 0,
            greenPercentage: 0,
            bluePercentage: 0
        });
    }

    newFollower(cb) {
        async.timesLimit(3, 1, (n, next) => {
            async.waterfall([
                (cb) => {
                    let i = 0;
                    async.doUntil((cb) => {
                        following.forEach((key) => {
                            this.logiled.setLightingForKeyWithKeyName(
                                {
                                    keyName: this.logiled.KeyName[key],
                                    redPercentage: i,
                                    greenPercentage: i,
                                    bluePercentage: i
                                }
                            );
                        });
                        i++;
                        setTimeout(cb, 10);
                    }, () => {
                        return i == 100
                    }, cb)
                },
                (cb) => {
                    let i = 100;
                    async.doUntil((cb) => {
                        following.forEach((key) => {
                            this.logiled.setLightingForKeyWithKeyName(
                                {
                                    keyName: this.logiled.KeyName[key],
                                    redPercentage: i,
                                    greenPercentage: i,
                                    bluePercentage: i
                                }
                            );
                        });
                        i--;
                        setTimeout(cb, 10);
                    }, () => {
                        return i == 0
                    }, cb)
                }
            ], () => {
                console.log('next');
                next();
            })
        }, cb);

    }

    numpadLight(cb) {
        async.each(numpad, (key, cb) => {
            this.logiled.setLightingForKeyWithKeyName(
                {
                    keyName: this.logiled.KeyName[key],
                    redPercentage: 100,
                    greenPercentage: 100,
                    bluePercentage: 100
                }
            );
            setTimeout(() => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 0,
                        greenPercentage: 0,
                        bluePercentage: 0
                    }
                );
                cb();
            }, 5000);
        }, () => {
            setTimeout(cb, 1000);
        })
    }

    donation(donate, cb) {
        const percent = Math.floor(donate.current / donate.meta * 100);
        if (percent >= 20) {
            numpad_ticker.p20.forEach((key) => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 100,
                        greenPercentage: 100,
                        bluePercentage: 100
                    }
                );
            });
        }
        if (percent >= 40) {
            numpad_ticker.p40.forEach((key) => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 100,
                        greenPercentage: 100,
                        bluePercentage: 100
                    }
                );
            });
        }
        if (percent >= 60) {
            numpad_ticker.p60.forEach((key) => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 100,
                        greenPercentage: 100,
                        bluePercentage: 100
                    }
                );
            });
        }
        if (percent >= 80) {
            numpad_ticker.p80.forEach((key) => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 100,
                        greenPercentage: 100,
                        bluePercentage: 100
                    }
                );
            });
        }
        if (percent >= 100) {
            numpad_ticker.p100.forEach((key) => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 100,
                        greenPercentage: 100,
                        bluePercentage: 100
                    }
                );
            });
        }
        setTimeout(cb, 1000);
    }

    numpadSpiral(cb) {
        async.eachLimit(numpad_spiral, 1, (key, cb) => {
            this.logiled.setLightingForKeyWithKeyName(
                {
                    keyName: this.logiled.KeyName[key],
                    redPercentage: 100,
                    greenPercentage: 100,
                    bluePercentage: 100
                }
            );
            setTimeout(cb, 200);
        }, () => {
            setTimeout(() => {
                numpad.forEach((key) => {
                    this.logiled.setLightingForKeyWithKeyName(
                        {
                            keyName: this.logiled.KeyName[key],
                            redPercentage: 0,
                            greenPercentage: 0,
                            bluePercentage: 0
                        }
                    );
                });
                cb && cb();
            }, 2000);
        })
    }

    message() {
        async.eachLimit(firstLine, 1, (key, cb) => {
            this.logiled.setLightingForKeyWithKeyName(
                {
                    keyName: this.logiled.KeyName[key],
                    redPercentage: 100,
                    greenPercentage: 100,
                    bluePercentage: 100
                }
            );
            setTimeout(() => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[key],
                        redPercentage: 0,
                        greenPercentage: 0,
                        bluePercentage: 0
                    }
                );
                cb();
            }, 200);
        }, (err) => {
        });

    }

    writeMessage(message, type, cb) {
        const cMessage = cyrillicToTranslit({preset: 'ru'}).transform(message);
        const aMessage = type == 'direct' ? ['G_LOGO'] : ['ARROW_UP', 'ARROW_LEFT', 'ARROW_DOWN', 'ARROW_RIGHT'];
        for (let i = 0; i < cMessage.length; i++) {
            if (cMessage[i] == ' ') {
                aMessage.push('SPACE');
            }
            else if (numbers[cMessage[i]]) {
                aMessage.push(numbers[cMessage[i]])
            } else if (this.logiled.KeyName[cMessage[i].toUpperCase()]) {
                aMessage.push(cMessage[i].toUpperCase());
            }
        }

        aMessage.forEach((character) => {
            this.logiled.setLightingForKeyWithKeyName(
                {
                    keyName: this.logiled.KeyName[character],
                    redPercentage: 100,
                    greenPercentage: 100,
                    bluePercentage: 100
                }
            );
        });
        setTimeout(() => {
            aMessage.forEach((character) => {
                this.logiled.setLightingForKeyWithKeyName(
                    {
                        keyName: this.logiled.KeyName[character],
                        redPercentage: 0,
                        greenPercentage: 0,
                        bluePercentage: 0
                    }
                );
            });
            cb && cb();
        }, 10000);
    }

    shutdown() {
        this.logiled.shutdown();
    }
}

module.exports = new CouchKeyboard();