const fs = require('fs');
const path = require('path');

const uuid = require('uuid').v1;
const Logger = require('agb-logger');

// const userPath = path.join(path.dirname(require.main.filename), 'users.json');
const userPath = './src/data/users.json';

const getUsers = async (cb) => {
    fs.readFile(userPath, (err, data) => {
        if (err) {
            Logger.error('Error fecthing users', err);
            return cb([]);
        } else {
            Logger.debug(`Getting users from file ${data}`);
            return cb(JSON.parse(data));
        }
    });
};

const writeUsers = (data, cb) => {
    fs.writeFile(userPath, JSON.stringify(data), (err) => {
        if (err) {
            Logger.error('Unable to write data to file', err);
            cb([]);
        }
    });
};

module.exports = class User {
    static getAllUsers(cb) {
        getUsers(cb);
    }

    static getUserById(id, cb) {
        this.getAllUsers((users) => {
            Logger.debug(`Getting User with ID: ${id}`);
            const user = users.find((user) => user.id === id);
            return user ? cb(user) : cb();
        });
    }

    static updateUserById(id, data, cb) {
        this.getUserById(id, (user) => {
            if (!user) {
                return cb(user);
            }

            Logger.debug(`Updating User: ${user.id}`);
            user.name = data.name;
            user.location = data.location;

            this.getAllUsers((users) => {
                const existingUserIndex = users.findIndex(
                    (user) => user.id === id
                );
                const updatedUserData = [...users];
                updatedUserData[existingUserIndex] = user;
                writeUsers(updatedUserData, () => {});
            });

            return cb(user);
        });
    }

    static deleteUserById(id, cb) {
        this.getUserById(id, (user) => {
            if (!user) {
                return cb(user);
            }

            Logger.debug(`Deleting User: ${user.id}`);

            this.getAllUsers((users) => {
                const existingUserIndex = users.findIndex(
                    (user) => user.id === id
                );
                const updatedUserData = [...users];
                updatedUserData.splice(existingUserIndex, 1);
                writeUsers(updatedUserData, () => {});
            });

            return cb('User deleted');
        });
    }

    static createUser(data, cb) {
        Logger.debug('Creating new user');

        const newUser = {
            id: uuid().substring(0, 8),
            name: data.name,
            location: data.location,
        };

        this.getAllUsers((users) => {
            const updatedUserData = [...users];
            updatedUserData.push(newUser);
            writeUsers(updatedUserData, () => {});
        });

        return cb(newUser);
    }
};
