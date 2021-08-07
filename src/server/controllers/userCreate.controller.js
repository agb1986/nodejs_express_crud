const Logger = require('agb-logger');

const User = require('../models/user.model');

module.exports = {
    postUser: (req, res) => {
        const postData = { name: req.body.name, location: req.body.location };
        Logger.debug('Creating new user');

        User.createUser(postData, (newUser) => {
            res.send(newUser);
        });
    },
};
