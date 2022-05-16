const Engagement = require("../models/engagement")


const EngagementController = {
    createEngagement: async function(id) {
        let e = new Engagement({ userID: id }).save((err) => {
            if (err) {
                throw new Error("Failed to create engagement");
            }
        });
        return true;
    },

    getEngagement: async function(id) {
        return (await Engagement.find({ userID: id })).length;
    }
}

module.exports = EngagementController;