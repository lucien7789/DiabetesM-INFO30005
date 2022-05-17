const Engagement = require("../models/engagement");
const UserModel = require("../models/user");


const EngagementController = {
    createEngagement: async function(id) {
        let exists = await Engagement.findOne({userID: id, time: {$gte: new Date(new Date().toLocaleString())} });

        if (exists) {
            console.log("engagementController.js - createEngagement() - User has already engaged today");
            return true;
        }
        let e = new Engagement({ userID: id }).save((err) => {
            if (err) {
                throw new Error("Failed to create engagement");
            }
        });
        return true;
    },

    getEngagement: async function(id) {
        let eCount = (await Engagement.find({ userID: id })).length;
        let user = await UserModel.findById(id);
        let days = Math.floor((
            Date.now() - new Date(user.registrationDate.toDateString()).getTime())/(1000*60*60*24)) || 1;
        
        return eCount / days;
    },

    getTopEngagements: async function() {
        var engagements = await Engagement.find();

        var grouping = {};

        engagements.map(e => {
            grouping[e.userID] = (grouping[e.userID] || 0) + 1
        });

        var users = await UserModel.find({accountType: 0});
        let days;
        users.map(u => {
            days = (Math.floor((
                Date.now() - new Date(u.registrationDate.toDateString()).getTime())/(1000*60*60*24)) || 1) + 1;
            grouping[u._id] = { username: u.username, engagement: grouping[u._id] / days}
        })
        let sorted = Object.values(grouping);

        sorted.sort((a,b) => b.engagement - a.engagement);
        return sorted.splice(0, 5);
    }
}

module.exports = EngagementController;