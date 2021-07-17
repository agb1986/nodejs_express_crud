const Logger = require('agb-logger');

const User = require('../models/user.model');

module.exports = {
    getUser: (req, res) => {
        const userId = req.query.id;
        User.getUserById(userId, (user) => {
            res.send(user);
        });
    },

    putUser: (req, res) => {
        res.send({
            hello: 'API/USER/PUT',
        });
    },

    deleteUser: (req, res) => {
        res.send({
            hello: 'API/USER/DELETE',
        });
    },
};
