const moment = require('moment');

const formatMessage = (username, text) => {
    const message = {
        username,
        text,
        time: moment().format('h:mm a')
    };
    return message;
}

module.exports = formatMessage;