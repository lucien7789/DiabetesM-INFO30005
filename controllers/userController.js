const bcrypt = require("bcryptjs");
const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");

const SALT_FACTOR = 10;
const UserController = {

    createUser: async function(username, password, firstName, lastName, accountType, referral) {
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
            let attr = { firstName: firstName, lastName: lastName, username: username, password: hash, accountType };

            /**
             *  If accountType is 0 (The account being created is a patient account)
             * 
             *  Then we need to check if the user sending request has enough permissions to issue the request
             * 
             *  Specifically, check user is a clinician
             **/
            let patientMeasures;

            if (accountType === 0) {
                if (!referral) {
                    throw new Error("No permission to create this account on your own");
                }
                let origin = await User.findById(referral);
                if (origin?.accountType !== 1) {
                    throw new Error("No permission to create an account for another user");
                }
                patientMeasures = await new PatientMeasures( { bloodGlucose: true, bloodGlucoseSafetyThresholdBottom: 6, bloodGlucoseSafetyThresholdTop: 9.2}).save();
                Object.assign(attr, { clinician: referral, patientMeasures });
            }
            new User(attr).save((err) => {
                if (err) {
                    throw new Error("Server failed to create a new user");
                }
            });
        }
        return true;
    },
    
    getUserById: function(id) {
        let finder = () => {
            return User.findById(id);
        }
        return findObjectTemplateFunction(finder, "getUserById()");
    },

    deleteUserById: async function(id) {
        try {
            const { deleteCount } = await User.deleteOne({_id: id});
            return deleteCount == 1;
        } catch (err) {
            console.log(`sampleController.js - UserController - deleteUser() - An error occurred trying to delete a new document for user: {id: ${id}}`);
        }
        return false;
    },

    updateUser: async function(id, newDoc) {
        try {
            const { updateCount } = await User.updateOne({_id: id}, {$set: newDoc});
            return updateCount == 1;
        } catch (err) {
            console.log(`sampleController.js - UserController - deleteUser() - An error occurred trying to update a document for user: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    },

    getPatientMeasuresByUserId: function(id) {
        let finder = async () => {
            let user = await User.findById(id);

            return PatientMeasures.findById(user.patientMeasures);
        }

        return findObjectTemplateFunction(finder, "getPatientMeasuresByUserId()");
    }
}

module.exports = UserController;