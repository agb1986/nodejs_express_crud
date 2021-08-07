const Logger = require('agb-logger');

const User = require('../models/user.model');

module.exports = {
    getUserList: (req, res) => {
        Logger.debug('Fetching all Users');
        User.getAllUsers(users => {
            res.send(users);
        });
    }
}