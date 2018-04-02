const keyboard = require('./couchkeyboard'),
    Streamlabs = require('./streamlabs'),
    twitch = require('./twitch');

twitch.listen(keyboard);

const streamlabs = new Streamlabs(keyboard);
