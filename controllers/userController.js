const bcrypt = require("bcryptjs");
const User = require("../models/user");
const UserModel = require("../models/sampleModel");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");

const SALT_FACTOR = 10;
const UserController = {

    createUser: async function(username, password, firstName, lastName, accountType) {
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, SALT_FACTOR, function(err, hash) {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
        let exists = await User.findOne({ username: username });
        if (exists) {
            console.log(`userController.js - UserController - createUser() - An error occurred trying to create a user with a username that is already existing: {username: ${username}}`);
            throw new Error("Username has already been taken, please try a different one");
        } else {
            new User({ firstName: firstName, lastName: lastName, username: username, password: hash, accountType: 0 }).save((err) => {
                if (err) {
                    throw new Error("Server failed to create a new user");
                }
            });
        }
        return true;
    },
    
    getUserById: function(id) {
        let finder = () => {
            return UserModel.findById(id);
        }
        return findObjectTemplateFunction(finder, "getUserById()");
    },

    getUserByName: function(name) {
        let finder = () => {
            return UserModel.findOne({name: name});
        }
        return findObjectTemplateFunction(finder, "getUserByName()");
    },

    deleteUserById: async function(id) {
        try {
            const { deleteCount } = await UserModel.deleteOne({id: id});
            return deleteCount == 1;
        } catch (err) {
            console.log(`sampleController.js - UserController - deleteUser() - An error occurred trying to delete a new document for user: {id: ${id}}`);
        }
        return false;
    },

    updateUser: async function(id, newDoc) {
        try {
            const { updateCount } = await UserModel.updateOne({id: id}, {$set: newDoc});
            return updateCount == 1;
        } catch (err) {
            console.log(`sampleController.js - UserController - deleteUser() - An error occurred trying to update a document for user: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    }
}

module.exports = UserController;