const Logger = require('agb-logger');

const User = require('../models/user.model');

module.exports = {
    getUser: (req, res) => {
        const userId = req.query.id;
        Logger.debug(`Fetching User: ${userId}`);

        User.getUserById(userId, (user) => {
            if (!user) {
                Logger.warn(`Unable to find user: ${userId}`);
                return res.sendStatus(404);
            }
            res.send(user);
        });
    },

    putUser: (req, res) => {
        const userId = req.query.id;
        const putData = { name: req.body.name, location: req.body.location };
        Logger.debug(`Updating User: ${userId}`);

        User.updateUserById(userId, putData, (user) => {
            if (!user) {
                Logger.warn(`Unable to find user: ${userId}`);
                return res.sendStatus(404);
            }
            res.send(user);
        });
    },

    deleteUser: (req, res) => {
        const userId = req.query.id;
        Logger.debug(`Deleting User: ${userId}`);

        res.send({
            hello: 'API/USER/DELETE',
        });
    },
};
