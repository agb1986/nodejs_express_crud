const fs = require('fs');
const path = require('path');

const Logger = require('agb-logger');

const userPath = path.join(path.dirname(require.main.filename), 'users.json');

const getUsers = (cb) => {
    fs.readFile(userPath, (err, data) => {
        if (err) {
            Logger.error('Error fecthing users', err);
            cb([]);
        } else {
            Logger.debug(`Getting users from file ${data}`);
            cb(JSON.parse(data));
        }
    });
};

module.exports = class User {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    static setName(name) {
        Logger.debug(`Setting ${this.name} to ${name}`);
        this.name = name;
    }

    static setLocation(location) {
        Logger.debug(`Setting ${this.location} to ${location}`);
        this.location = location;
    }

    static getAllUsers(cb) {
        getUsers(cb);
    }

    static getUserById(id, cb) {
        this.getAllUsers((users) => {
            Logger.debug(`Getting User with ID: ${id}`);
            users.users.forEach((user) => {
                if (user.id === id) {
                    Logger.debug(`Returning User: ${user.id}`)
                    Logger.debug(`Returning User: ${user.name}`)
                    Logger.debug(`Returning User: ${user.location}`)
                    return cb(user);
                }
            });
        });
    }
};
