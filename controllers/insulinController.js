const Insulin = require('../models/insulin');
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const InsulinController = {

    createInsulin: async function(doses, userID) {
        try {
            const insulinDoc = new Insulin({ doses: doses, userID: userID });

            await insulinDoc.save();
        } catch (err) {
            console.log(`insulinController.js - InsulinController - createInsulin() - An error occurred trying to create a new document for insulin: {doses: ${doses}, userID: ${userID}}`);
            return false;
        }
        return true;
    },

    getInsulinById: function(id) {
        let finder = () => {
            return Insulin.findById(id);
        }
        return findObjectTemplateFunction(finder, "getInsulinById()");
    },

    getInsulinByUserID: function(userID) {
        let finder = () => {
            return Insulin.find({userID: userID});
        }
        return findObjectTemplateFunction(finder, "getInsulinByUserID()");
    },

    deleteInsulinById: async function(id) {
        try {
            const { deleteCount } = await Insulin.deleteOne({id: id});
            return deleteCount == 1;
        } catch (err) {
            console.log(`insulinController.js - InsulinController - deleteInsulin() - An error occurred trying to delete a new document for insulin: {id: ${id}}`);
        }
        return false;
    },

    updateInsulin: async function(id, newDoc) {
        try {
            const { updateCount } = await Insulin.updateOne({id: id}, {$set: newDoc});
            return updateCount == 1;
        } catch (err) {
            console.log(`insulinController.js - InsulinController - deleteInsulin() - An error occurred trying to update a document for insulin: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    }
}

module.exports = InsulinController;